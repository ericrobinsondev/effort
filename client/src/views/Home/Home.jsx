import React, { Component } from 'react';
import { weekRangeInWords } from '../../utils/helpers';
import {
  UikHeadline,
  UikSelect,
  UikWidget,
  UikWidgetHeader,
  UikWidgetTable
} from '../../@uik';

export class Home extends Component {
  state = {
    dueDate: Date.now(),
    responses: [{ _id: 0, dueDate: Date.now() }],
    isCoach: false
  };

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
          <UikHeadline style={{ marginLeft: '20px' }}>Group</UikHeadline>
          <UikSelect
            placeholder={weekRangeInWords(this.state.dueDate)}
            options={[
              this.state.responses.map(response => {
                return {
                  value: response._id,
                  label: weekRangeInWords(response.dueDate),
                  key: response._id
                };
              })
            ]}
            position='bottomRight'
          />
        </div>
        <div>
          <UikWidget>
            <UikWidgetHeader>Responses</UikWidgetHeader>
            <UikWidgetTable>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>First Last</td>
                  <td>Points</td>
                </tr>
              </tbody>
            </UikWidgetTable>
          </UikWidget>
        </div>
      </div>
    );
  }
}
