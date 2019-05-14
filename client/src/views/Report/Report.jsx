import React, { Component } from 'react';
import { QuestionChart } from './QuestionChart';
import { WeekProgressChart } from './WeekProgressChart';
import { navigate } from '@reach/router';
// import { GroupChart } from './GroupChart';
import { UikButton, UikHeadline, UikContentTitle, UikSelect } from '../../@uik';
// import { mockAPI } from './fixture';
import { withAuthContext } from '../../utils/AuthContext';

import {
  dateInWords,
  weekStart,
  weekEnd,
  weekRangeInWords
} from '../../utils/helpers';

export class Report extends Component {
  constructor(props) {
    super(props);

    this.changeAmount.bind(this);
  }

  state = {
    groupPoints: {},
    createdBy: null,
    needToCreateResponse: true,
    submitting: false,
    reportUserName: '',
    dueDate: null,
    otherReports: [],
    group: null,
    viewerIsSelf: false,
    viewerisCoach: false
  };

  componentDidMount() {
    this.loadReportData();
    // this.setState({ groupPoints: this.loadGroupPoints() });
  }

  loadReportData() {
    fetch(`/api/report/${this.props.id}`, {
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
        this.loadGroupData(response.data._id);
      })
      .catch(error => console.error(error));
  }

  loadResponseData(reportId) {
    fetch(`/api/report/${reportId}/response/my`, {
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
            createdBy: response.data.createdBy._id,
            viewerIsSelf: this.props.user._id == response.data.createdBy._id,
            reportUserName: `${response.data.createdBy.firstName} ${
              response.data.createdBy.lastName
            }`,
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
        } else if (response.status === 404) {
          this.setState({
            needToCreateResponse: true,
            coachComment: ' ',
            totalPointsEarned: 0,
            questions: this.state.questions.map(question => {
              return {
                ...question,
                comment: '',
                pointsEarned: 0,
                amount: 0
              };
            })
          });
        }
      })
      .catch(error => console.error(error));
  }
  // loadGroupPoints() {
  //   return mockAPI.loadGroupPoints();
  // }

  loadGroupData(reportId) {
    fetch(`/api/group/${this.state.group}/report/${reportId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          otherReports: response.data.group.reports.reverse()
        });
      })
      .catch(error => console.error(error));
  }

  changeReport = async ({ value }) => {
    await navigate(`/user/${this.state.createdBy}/report/${value}`);
    this.loadReportData();
  };

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
      .then(response =>
        response.json().then(data => ({
          status: response.status,
          ...data,
          message: response.message
        }))
      )
      .then(response => {
        response.status === 201 || response.status === 200
          ? alert('Saved successfully')
          : alert(`Error: ${response.message}`);
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
        <div style={{ padding: '30px', marginLeft: '20px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <UikHeadline>
              Weekly Report: {this.state.reportUserName}
            </UikHeadline>
            <UikSelect
              placeholder={weekRangeInWords(this.state.dueDate)}
              options={this.state.otherReports.map(report => {
                return {
                  value: report._id,
                  label: weekRangeInWords(report.dueDate),
                  key: report._id
                };
              })}
              onChange={this.changeReport}
              position='bottomRight'
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            <WeekProgressChart
              pointsExpected={this.state.pointsExpected}
              pointsEarned={this.state.totalPointsEarned}
            />
            {/* <GroupChart groupPoints={this.state.groupPoints} /> */}
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
                        pointsEarned={
                          question.pointsEarned ? question.pointsEarned : 0
                        }
                        pointsExpected={question.pointsExpected}
                        comment={question.comment ? question.comment : ' '}
                        amount={question.amount ? question.amount : 0}
                        handleChange={this.changeAmount}
                        handleCommentChange={this.handleCommentChange}
                      />
                    );
                  })
                : ''}
            </div>
          </div>
          {(this.state.viewerIsSelf || this.state.viewerIsCoach) && (
            <div>
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
          )}
        </div>
      </form>
    );
  }
}

export default withAuthContext(Report);
