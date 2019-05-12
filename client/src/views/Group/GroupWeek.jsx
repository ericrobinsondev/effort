import React, { Component } from 'react';
import { withAuthContext } from '../../utils/AuthContext';
import { weekRangeInWords } from '../../utils/helpers';
import { UikHeadline, UikSelect, UikWidget, UikWidgetTable } from '../../@uik';
import { Link, navigate } from '@reach/router';

export class GroupWeek extends Component {
  state = {
    responses: [],
    report: {
      dueDate: Date.now(),
      _id: 0
    },
    otherReports: []
  };

  componentDidMount() {
    this.fetchGroupWeekData();
  }

  changeReport = async ({ value }) => {
    await navigate(`/group/week/${value}`);
    this.fetchGroupWeekData();
  };

  fetchGroupWeekData() {
    const groupId = this.props.isCoach
      ? this.props.user.coachOfGroups[0]
      : this.props.user.group;

    const reportId = this.props.reportId ? this.props.reportId : '';

    fetch(`/api/group/${groupId}/report/${reportId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(response => {
        const groupWeekResponses = response.data.responses.map(response => {
          return {
            firstName: response.createdBy.firstName,
            lastName: response.createdBy.lastName,
            totalPointsEarned: response.totalPointsEarned,
            _id: response._id
          };
        });

        this.setState({
          responses: groupWeekResponses,
          name: response.data.group.name,
          otherReports: response.data.group.reports.reverse(),
          report: {
            dueDate: response.data.report.dueDate,
            _id: response.data.report._id
          }
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div style={{ padding: '30px', marginLeft: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <UikHeadline>
            Group{this.state.name && `: ${this.state.name}`}
          </UikHeadline>
          <UikSelect
            placeholder={weekRangeInWords(this.state.report.dueDate)}
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
        <div>
          <UikHeadline>Responses</UikHeadline>
          <UikWidget>
            <UikWidgetTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {this.state.responses &&
                  this.state.responses.map(response => {
                    return (
                      <tr key={response._id}>
                        <td>{`${response.firstName} ${response.lastName}`}</td>
                        <td>{response.totalPointsEarned}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </UikWidgetTable>
          </UikWidget>
        </div>
        <div>
          <UikHeadline>Report</UikHeadline>
          <p>
            <Link to={`/report/${this.state.report._id}`}>
              Report for week of {weekRangeInWords(this.state.report.dueDate)}
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

export default withAuthContext(GroupWeek);
