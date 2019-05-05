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
    groupPoints: {},
    needToCreateResponse: true,
    submitting: false
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
      .then(response => {
        this.setState(response.data);
        this.loadResponseData(response.data._id);
      })
      .catch(error => console.error(error));
  }

  loadResponseData(reportID) {
    fetch(`/api/report/${reportID}/response/my`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response =>
        response.json().then(data => ({
          status: response.status,
          ...data,
          message: response.message
        }))
      )
      .then(response => {
        if (response.status === 200) {
          this.setState({
            needToCreateResponse: false,
            coachComment: response.data.coachComment,
            responseID: response.data._id,
            totalPointsEarned: response.data.totalPointsEarned,
            questions: this.state.questions.map(question => {
              var matchingAnswer = response.data.answers.find(
                answer => answer.questionTitle === question.title
              );
              return {
                ...question,
                comment: matchingAnswer.comment,
                pointsEarned: matchingAnswer.pointsEarned,
                amount: matchingAnswer.amount
              };
            })
          });
        }
      })
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
      totalPointsEarned:
        this.state.totalPointsEarned + (pointsEarned - question.pointsEarned),
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

  handleCommentChange = event => {
    const idToUpdate = event.target.getAttribute('data-comment-id');
    const questionIndex = this.state.questions.findIndex(
      // eslint-disable-next-line eqeqeq
      question => question._id == idToUpdate
    );

    this.setState({
      questions: [
        ...this.state.questions.slice(0, questionIndex),
        {
          ...this.state.questions[questionIndex],
          comment: event.target.value
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

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ submitting: true });

    const url = this.state.needToCreateResponse
      ? `/api/report/${this.state._id}/response`
      : `/api/report/${this.state._id}/response/${this.state.responseID}`;

    const httpVerb = this.state.needToCreateResponse ? 'POST' : 'PUT';

    fetch(url, {
      method: httpVerb,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        totalPointsEarned: this.state.totalPointsEarned,
        coachComment: this.state.coachComment || '',
        report: this.state._id,
        answers: this.state.questions.map(question => {
          return {
            questionTitle: question.title,
            amount: question.amount,
            pointsEarned: question.pointsEarned,
            comment: question.comment
          };
        })
      })
    })
      .finally(this.setState({ submitting: false }))
      .catch(error => console.error(error));
  };

  handleCoachCommentChange = event => {
    this.setState({
      coachComment: event.target.value
    });
  };

  render() {
    return (
      <form>
        <div style={{ padding: '30px' }}>
          <UikHeadline style={{ marginLeft: '20px' }}>
            Weekly Report:{' '}
            {`${dateInWords(weekStart(this.state.dueDate))} \u2014
            ${dateInWords(weekEnd(this.state.dueDate))}`}
          </UikHeadline>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <WeekProgressChart
              pointsExpected={this.state.pointsExpected}
              pointsEarned={this.state.totalPointsEarned}
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
                        handleCommentChange={this.handleCommentChange}
                      />
                    );
                  })
                : ''}
            </div>
          </div>
          <div style={{ margin: '20px' }}>
            <UikContentTitle>Comment for Coach</UikContentTitle>
            <br />
            <textarea
              className='uik-input__input'
              style={{ minHeight: '75px' }}
              onChange={this.handleCoachCommentChange}
              value={this.state.coachComment}
            />
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
            <UikButton
              primary
              style={{ marginRight: '10px' }}
              onClick={this.handleSubmit}
              disabled={this.state.submitting}
              isLoading={this.state.submitting}
            >
              Save
            </UikButton>
            <UikButton disabled={this.state.submitting}>Cancel</UikButton>
          </div>
        </div>
      </form>
    );
  }
}
