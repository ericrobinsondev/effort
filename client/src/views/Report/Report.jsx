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
    pointsEarned: 235,
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
        pointsEarned: 35,
        pointsExpected: 35,
        comment: '',
        amount: 1
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
    //console.log(event.target.getAttribute('data-question'));
    const idToUpdate = event.target.getAttribute('data-id');
    this.setState({
      questions: {
        ...this.state.questions,
        [idToUpdate]: {
          ...this.state.questions[idToUpdate],
          amount: event.target.value
        }
      }
    });
  };

  render() {
    console.log(this.state);
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
