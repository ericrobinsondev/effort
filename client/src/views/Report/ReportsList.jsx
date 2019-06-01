import React, { Component } from 'react';
import { UikHeadline, UikWidget, UikWidgetTable, UikButton } from '../../@uik';
import { weekRangeInWords } from '../../utils/helpers';
import { withAuthContext } from '../../utils/AuthContext';
import { Link } from '@reach/router';

export class ReportsList extends Component {
  state = {
    reports: []
  };

  componentDidMount() {
    this.fetchReports();
  }

  fetchReports() {
    const groupId = this.props.user.coachOfGroups[0]._id;

    fetch(`/api/group/${groupId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          reports: response.data[0].reports.reverse()
        });
      });
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
          <UikHeadline>Reports</UikHeadline>
          <UikButton
            success
            Component={Link}
            to='/report/create'
            style={{ textDecoration: 'none' }}
          >
            New Report
          </UikButton>
        </div>
        <UikWidget>
          <UikWidgetTable>
            <thead>
              <tr>
                <th>Report</th>
                <th>Points Expected</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.reports.length > 0 &&
                this.state.reports.map(report => {
                  return (
                    <tr key={report._id}>
                      <td>{weekRangeInWords(report.dueDate)}</td>
                      <td>{report.pointsExpected}</td>
                      <td>
                        <UikButton
                          xs
                          Component={Link}
                          to={`/group/week/${report._id}`}
                          style={{ textDecoration: 'none' }}
                        >
                          View Responses
                        </UikButton>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </UikWidgetTable>
        </UikWidget>
      </div>
    );
  }
}

export default withAuthContext(ReportsList);
