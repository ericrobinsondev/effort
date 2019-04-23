import React from 'react';
import { Redirect } from '@reach/router';
import { AuthConsumer } from './AuthContext';

export const ProtectedRoute = ({
  component: Component,
  altComponent: AltComponent = null,
  ...rest
}) => (
  <AuthConsumer>
    {({ isAuth }) =>
      isAuth ? (
        <Component {...rest} />
      ) : AltComponent ? (
        <AltComponent {...rest} />
      ) : (
        <Redirect from='' to='login' noThrow />
      )
    }
  </AuthConsumer>
);
