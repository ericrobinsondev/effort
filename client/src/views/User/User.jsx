import React, { Component } from 'react';
import { withAuthContext } from '../../utils/AuthContext';
import {
  UikHeadline,
  UikWidget,
  UikWidgetTable,
  UikWidgetHeader
} from '../../@uik';
import { Link } from '@reach/router';
import { weekRangeInWords, compareObjectValues } from '../../utils/helpers';

export class User extends Component {
  state = {
    firstName: '',
    lastName: '',
    id: this.props.userId,
    responses: []
  };

  async componentDidMount() {
    // if (this.props.userId !== this.props.user._id) {
    //   if (
    //     this.props.user.coachOfGroups[0] &&
    //     this.props.user.coachOfGroups[0].members.includes(this.props.userid)
    //   ) {
    //   } else {
    //     await navigate('/');
    //   }
    // } NEED TO ALSO ADD A CHECK FOR WHETHER USERS ARE IN SAME GROUP
    this.fetchUserData();
  }

  fetchUserData() {
    fetch(`/api/user/${this.props.userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          responses: response.data.responses.sort(
            compareObjectValues('dueDate', 'desc')
          )
        });
      });
  }

  render() {
    return (
      <div style={{ padding: '30px', marginLeft: '20px' }}>
        <div>
          <UikHeadline>
            {`${this.state.firstName} ${this.state.lastName}`}
          </UikHeadline>
        </div>
        <div>
          <UikWidget>
            <UikWidgetHeader>Responses</UikWidgetHeader>
            <UikWidgetTable>
              <thead>
                <tr>
                  <th>Week</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {this.state.responses &&
                  this.state.responses.map(response => {
                    return (
                      <tr key={response._id}>
                        <td>{weekRangeInWords(response.dueDate)}</td>
                        <td>{response.totalPointsEarned}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </UikWidgetTable>
          </UikWidget>
        </div>
      </div>
    );
  }
}

export default withAuthContext(User);
