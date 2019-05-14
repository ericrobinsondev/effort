import React, { Component } from 'react';
import {
  UikHeadline,
  UikWidget,
  UikWidgetHeader,
  UikWidgetTable
} from '../../@uik';
import { weekEnd, dateInWords } from '../../utils/helpers';
import { Link } from '@reach/router';

export class Group extends Component {
  state = {
    name: '',
    dueDate: dateInWords(weekEnd(Date.now()))
  };

  componentDidMount() {
    const groupId =
      JSON.parse(localStorage.getItem('user')).coachOfGroups.length > 0
        ? JSON.parse(localStorage.getItem('user')).coachOfGroups[0]._id
        : JSON.parse(localStorage.getItem('user')).group;

    this.fetchGroupData(groupId);
  }

  fetchGroupData(groupID) {
    const url = `/api/group/${groupID}`;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState(response.data[0]);
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div style={{ padding: '30px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <UikHeadline style={{ marginLeft: '20px' }}>
            {this.state.name}
          </UikHeadline>
        </div>
        <div>
          <UikWidget>
            <UikWidgetHeader>Members</UikWidgetHeader>
            <UikWidgetTable>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.members &&
                  this.state.members.map(member => {
                    return (
                      <tr key={member._id}>
                        <td>
                          <Link to={`/user/${member._id}`}>{`${
                            member.firstName
                          } ${member.lastName}`}</Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </UikWidgetTable>
            <UikWidgetHeader>Coaches</UikWidgetHeader>
            <UikWidgetTable>
              <thead>
                <tr>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {this.state.coaches &&
                  this.state.coaches.map(coach => {
                    return (
                      <tr key={coach._id}>
                        <td>{`${coach.firstName} ${coach.lastName}`}</td>
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
