import React, { Component } from 'react';
import { QuestionChart } from './QuestionChart';
import { UikToggle, UikButton } from '../../@uik';

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
          comment: ''
        },
        {
          title: 'How many names did you brainstorm?',
          pointsEach: 1,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 35,
          comment: ''
        },
        {
          title: 'Have you completed your admin work this week?',
          pointsEach: 35,
          creditForEach: false,
          pointsEarned: 0,
          pointsExpected: 50,
          comment: ''
        },
        {
          title: 'How many asks have you made this week?',
          pointsEach: 15,
          creditForEach: true,
          pointsEarned: 0,
          pointsExpected: 45,
          comment: ''
        }
      ],
      reportComment: ''
    }
  };
  render() {
    return (
      <div>
        This is the Report for {this.state.report.startDate.day};
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
            />
          );
        })}
        <UikToggle defaultChecked label='Active Week' />
        <UikButton primary>Save</UikButton>
        <UikButton>Cancel</UikButton>
      </div>
    );
  }
}
