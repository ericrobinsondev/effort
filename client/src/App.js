import React, { Component } from 'react';
import { Router } from '@reach/router';
import './@uik/styles.css';
import { Login } from './views/Login';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Layout } from './views/Layout';
import { Report } from './views/Report';
import { Home } from './views/Home';
import { Group } from './views/Group';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AuthProvider>
          <Router primary={false}>
            {/* <Home path='/' /> */}
            <ProtectedRoute path='/' component={Layout}>
              <Home path='/' component={Home} />
              <Report path='current' component={Report} />
              <Group path='group' component={Group} />
            </ProtectedRoute>
            {/* <ProtectedRoute path='/landing' component={Landing} /> */}
            <Login path='/login' />
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
