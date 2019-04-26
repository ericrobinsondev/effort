import React, { Component } from 'react';
import { QuestionChart } from './QuestionChart';
import { WeekProgressChart } from './WeekProgressChart';
import { UikToggle, UikButton, UikHeadline, UikContentTitle } from '../../@uik';

export class Report extends Component {
  constructor(props) {
    super(props);

    this.changeAmount.bind(this);
  }

  state = {
    id: 123,
    userId: 4321,
    startDate: {
      year: 2019,
      month: 4,
      day: 21
    },
    pointsEarned: 0,
    pointsExpected: 356,
    questions: {
      0: {
        id: 0,
        title: 'How many dials did you make?',
        pointsEach: 5,
        creditForEach: true,
        pointsEarned: 0,
        pointsExpected: 50,
        comment: '',
        amount: 0
      },
      1: {
        id: 1,
        title: 'How many names did you brainstorm?',
        pointsEach: 1,
        creditForEach: true,
        pointsEarned: 0,
        pointsExpected: 35,
        comment: '',
        amount: 0
      },
      2: {
        id: 2,
        title: 'Have you completed your admin work this week?',
        pointsEach: 35,
        creditForEach: false,
        pointsEarned: 0,
        pointsExpected: 35,
        comment: '',
        amount: 0
      },
      3: {
        id: 3,
        title: 'How many asks have you made this week?',
        pointsEach: 15,
        creditForEach: true,
        pointsEarned: 0,
        pointsExpected: 45,
        comment: '',
        amount: 0
      },
      4: {
        id: 4,
        title: 'How many trips to coffee shops have you made this week?',
        pointsEach: 15,
        creditForEach: true,
        pointsEarned: 0,
        pointsExpected: 45,
        comment: '',
        amount: 0
      },
      5: {
        id: 5,
        title: 'How many pastors have you talked to this week?',
        pointsEach: 15,
        creditForEach: true,
        pointsEarned: 0,
        pointsExpected: 45,
        comment: '',
        amount: 0
      }
    },
    reportComment: ''
  };

  changeAmount = event => {
    const idToUpdate = event.target.getAttribute('data-id');
    const question = this.state.questions[idToUpdate];
    const pointsEarned = this.calculatePointsEarned(
      question.creditForEach,
      event.target.value,
      question.pointsEach
    );

    console.log(pointsEarned);

    this.setState({
      pointsEarned:
        this.state.pointsEarned + (pointsEarned - question.pointsEarned),
      questions: {
        ...this.state.questions,
        [idToUpdate]: {
          ...this.state.questions[idToUpdate],
          amount: event.target.value,
          pointsEarned: pointsEarned
        }
      }
    });
  };

  calculatePointsEarned = (creditForEach, amount, pointsEach) => {
    return creditForEach ? amount * pointsEach : amount > 0 ? pointsEach : 0;
  };

  render() {
    console.log(this.state.questions[0]);
    return (
      <div style={{ padding: '30px' }}>
        <UikHeadline style={{ marginLeft: '20px' }}>Weekly Report</UikHeadline>
        <div>
          <WeekProgressChart
            pointsExpected={this.state.pointsExpected}
            pointsEarned={this.state.pointsEarned}
          />
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
            {Object.values(this.state.questions).map(question => {
              return (
                <QuestionChart
                  id={question.id}
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
            })}
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
