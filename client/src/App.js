import React, { Component } from 'react';
import { Router } from '@reach/router';
import './@uik/styles.css';
import { Login } from './views/Login';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Layout } from './views/Layout';
import { Report } from './views/Report';
import { Group } from './views/Group';
import GroupWeek from './views/Group/GroupWeek';
import User from './views/User/User';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AuthProvider>
          <Router primary={false}>
            <ProtectedRoute path='/' component={Layout}>
              <GroupWeek path='/' component={GroupWeek} />
              <Report path='current' component={Report} />
              <Group path='group' component={Group} />
              <GroupWeek path='group/week/:reportId' component={GroupWeek} />
              <User path='user/:userId' component={User} />
            </ProtectedRoute>
            <Login path='/login' />
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
