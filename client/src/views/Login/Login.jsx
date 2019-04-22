import React, { Component } from 'react';
import { Link } from '@reach/router';
import { AuthConsumer } from '../../utils/AuthContext';

export class Login extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ isAuth, login, logout }) => (
          <div>
            <h3>
              <Link to='/'>Home</Link>
            </h3>
            {isAuth ? (
              <ul>
                <Link to='/landing'>Landing</Link>
                <button onClick={logout}>logout</button>
              </ul>
            ) : (
              <button onClick={login}>login</button>
            )}
          </div>
        )}
      </AuthConsumer>
    );
  }
}
