import React, { Component } from 'react';
import { Router, Link } from '@reach/router';
import logo from './logo.svg';
import './App.css';
import './@uik/styles.css';
import { Login } from './views/Login';
import { Landing } from './views/Landing';
import { Home } from './views/Home';
import { AuthProvider } from './utils/AuthContext';
import { ProtectedRoute } from './utils/ProtectedRoute';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <AuthProvider>
          <Link to='/'>Home</Link>
          <Link to='/landing'>Landing</Link>
          <Link to='/login'>Login</Link>
          <Router>
            {/* <Home path='/' /> */}
            <ProtectedRoute path='/' component={Home} altComponent={Landing} />
            <ProtectedRoute path='/landing' component={Landing} />
            <Login path='/login' />
          </Router>
        </AuthProvider>
      </div>
    );
  }
}

export default App;
