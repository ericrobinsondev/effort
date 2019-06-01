import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import { AuthContext } from '../../utils/AuthContext';
import ReportsList from '../Report/ReportsList';
import mongoose from 'mongoose';
import 'jest-dom/extend-expect';
import fetchMock from 'fetch-mock';

afterEach(cleanup, fetchMock.restore());

describe('<ReportList />', () => {
  it('should render correctly for coaches', async () => {
    const groupId = mongoose.Types.ObjectId();

    fetchMock.get(`/api/group/${groupId}`, {
      data: [
        {
          reports: [
            {
              _id: mongoose.Types.ObjectId(),
              dueDate: Date.now(),
              pointsExpected: 100
            }
          ]
        }
      ]
    });

    const tree = (
      <AuthContext.Provider
        value={{
          user: { coachOfGroups: [groupId] },
          isCoach: () => true
        }}
      >
        <ReportsList />
      </AuthContext.Provider>
    );

    const { getByText, container } = render(tree);
    const pointsExpected = await waitForElement(() => getByText(/100/));
    expect(container).toMatchSnapshot();
    expect(pointsExpected).toHaveTextContent('100');
    expect(getByText(/New Report/)).toBeInTheDocument();
  });
});
