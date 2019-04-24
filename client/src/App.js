import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import './@uik/styles.css';
import { Login } from './views/Login';
import { Landing } from './views/Landing';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './utils/ProtectedRoute';
import { Layout } from './views/Layout';
import { Report } from './views/Report';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AuthProvider>
          <Link to='/'>Home</Link>
          <Link to='/'>Landing</Link>
          <Link to='/login'>Login</Link>
          <Router primary={false}>
            {/* <Home path='/' /> */}
            <ProtectedRoute path='/' component={Layout} altComponent={Landing}>
              <Report path='current' component={Report} />
            </ProtectedRoute>
            <ProtectedRoute path='/landing' component={Landing} />
            <Login path='/login' />
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
