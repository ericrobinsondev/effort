import React, { Component } from 'react';
import { QuestionChart } from './QuestionChart';
import { WeekProgressChart } from './WeekProgressChart';
import { GroupChart } from './GroupChart';
import { UikToggle, UikButton, UikHeadline, UikContentTitle } from '../../@uik';
import { mockAPI } from './fixture';
import { dateInWords, weekStart, weekEnd } from '../../utils/helpers';

export class Report extends Component {
  constructor(props) {
    super(props);

    this.changeAmount.bind(this);
  }

  state = {
    groupPoints: {}
  };

  componentDidMount() {
    this.loadReportData();
    this.setState({ groupPoints: this.loadGroupPoints() });
  }

  loadReportData() {
    fetch('/api/report/current', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(response => this.setState(response.data))
      .catch(error => console.error(error));
  }

  loadGroupPoints() {
    return mockAPI.loadGroupPoints();
  }

  changeAmount = event => {
    const idToUpdate = event.target.getAttribute('data-id');
    const questionIndex = this.state.questions.findIndex(
      // eslint-disable-next-line eqeqeq
      question => question._id == idToUpdate
    );
    const question = this.state.questions[questionIndex];
    const pointsEarned = this.calculatePointsEarned(
      question.creditForEach,
      event.target.value,
      question.pointsEach
    );

    this.setState({
      pointsEarned:
        this.state.pointsEarned + (pointsEarned - question.pointsEarned),
      questions: [
        ...this.state.questions.slice(0, questionIndex),
        {
          ...this.state.questions[questionIndex],
          amount: event.target.value,
          pointsEarned
        },
        ...this.state.questions.slice(
          questionIndex + 1,
          this.state.questions.length
        )
      ]
    });
  };

  calculatePointsEarned = (creditForEach, amount, pointsEach) => {
    return creditForEach ? amount * pointsEach : amount > 0 ? pointsEach : 0;
  };

  render() {
    return (
      <div style={{ padding: '30px' }}>
        <UikHeadline style={{ marginLeft: '20px' }}>
          Weekly Report:{' '}
          {`${dateInWords(weekStart(this.state.dueDate))} \u2014
            ${dateInWords(weekEnd(this.state.dueDate))}`}
        </UikHeadline>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <WeekProgressChart
            pointsExpected={this.state.pointsExpected}
            pointsEarned={this.state.pointsEarned}
          />
          <GroupChart groupPoints={this.state.groupPoints} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'flex-start'
            }}
          >
            {this.state.questions
              ? this.state.questions.map(question => {
                  return (
                    <QuestionChart
                      id={question._id}
                      key={question.title}
                      title={question.title}
                      pointsEach={question.pointsEach}
                      creditForEach={question.creditForEach}
                      pointsEarned={question.pointsEarned}
                      pointsExpected={question.pointsExpected}
                      comment={question.comment}
                      amount={question.amount}
                      handleChange={this.changeAmount}
                    />
                  );
                })
              : ''}
          </div>
        </div>
        <div style={{ margin: '20px' }}>
          <UikContentTitle>Comment for Coach</UikContentTitle>
          <br />
          <textarea className='uik-input__input' style={{ minHeight: '75px' }}>
            {this.state.comment}
          </textarea>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: '20px'
          }}
        >
          <UikToggle defaultChecked label='Active Week' />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <UikButton primary style={{ marginRight: '10px' }}>
            Save
          </UikButton>
          <UikButton>Cancel</UikButton>
        </div>
      </div>
    );
  }
}
