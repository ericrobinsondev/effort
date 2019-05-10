import React from 'react';
import { AuthConsumer } from '../../utils/AuthContext';
import { CoachHome } from './CoachHome';

export const Home = props => {
  return (
    <div>
      <AuthConsumer>
        {({ user }) =>
          user.coachOfGroups.length ? (
            <CoachHome user={user} />
          ) : (
            <p>This is the non-Coach HOME component.</p>
          )
        }
      </AuthConsumer>
    </div>
  );
};
