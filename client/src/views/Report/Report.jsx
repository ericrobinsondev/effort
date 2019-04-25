import React, { Component } from 'react';
import { QuestionChart } from './QuestionChart';
import {
  UikToggle,
  UikButton,
  UikHeadline,
  UikHeadlineDesc,
  UikContentTitle
} from '../../@uik';

export class Report extends Component {
  state = {
    report: {
      id: 123,
      userId: 4321,
      startDate: {
        year: 2019,
        month: 4,
        day: 21
      },
      pointsEarned: 0,
      pointsExpected: 356,
      questions: [
        {
          title: 'How many dials did you make?',
          pointsEach: 5,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 50,
          comment: '',
          amount: 0
        },
        {
          title: 'How many names did you brainstorm?',
          pointsEach: 1,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 35,
          comment: '',
          amount: 0
        },
        {
          title: 'Have you completed your admin work this week?',
          pointsEach: 35,
          creditForEach: false,
          pointsEarned: 0,
          pointsExpected: 50,
          comment: '',
          amount: 0
        },
        {
          title: 'How many asks have you made this week?',
          pointsEach: 15,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 45,
          comment: '',
          amount: 0
        },
        {
          title: 'How many asks have you made this week?',
          pointsEach: 15,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 45,
          comment: '',
          amount: 0
        },
        {
          title: 'How many asks have you made this week?',
          pointsEach: 15,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 45,
          comment: '',
          amount: 0
        }
      ],
      reportComment: ''
    }
  };
  render() {
    return (
      <div style={{ padding: '30px' }}>
        <UikHeadline>Weekly Report</UikHeadline>
        <UikHeadlineDesc>
          {this.state.report.startDate.month} {this.state.report.startDate.day}
        </UikHeadlineDesc>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {this.state.report.questions.map(question => {
              return (
                <QuestionChart
                  key={question.title}
                  title={question.title}
                  pointsEach={question.pointsEach}
                  creditForEach={question.creditForEach}
                  pointsEarned={question.pointsEarned}
                  pointsExpected={question.pointsExpected}
                  comment={question.comment}
                  amount={question.amount}
                />
              );
            })}
          </div>
        </div>
        <div style={{ margin: '20px' }}>
          <UikContentTitle>Comment for Coach</UikContentTitle>
          <br />
          <textarea className='uik-input__input' style={{ minHeight: '75px' }}>
            {this.state.report.comment}
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
