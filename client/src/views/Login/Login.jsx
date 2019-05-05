import React, { Component } from 'react';
import { AuthConsumer } from '../../utils/AuthContext';
import { UikWidget, UikButton, UikWidgetHeader } from '../../@uik';
import { LoginForm } from './LoginForm';

export class Login extends Component {
  render() {
    return (
      <AuthConsumer>
        {({ isAuth, login, logout, loginError }) => (
          <UikWidget
            padding
            style={{
              width: 500 + 'px',
              margin: '0 auto'
            }}
          >
            <UikWidgetHeader noDivider>Login</UikWidgetHeader>
            {isAuth ? (
              <UikButton onClick={logout}>logout</UikButton>
            ) : (
              <div>
                <LoginForm onLogin={login} />
                <p style={{ color: '#F00' }}>{loginError}</p>
              </div>
            )}
          </UikWidget>
        )}
      </AuthConsumer>
    );
  }
}
