import React from 'react';
import { Redirect } from '@reach/router';
import { AuthConsumer } from './AuthContext';

export const ProtectedRoute = ({
  component: Component,
  altComponent: AltComponent = null,
  children,
  ...rest
}) => (
  <AuthConsumer>
    {({ isAuth }) =>
      isAuth ? (
        <Component {...rest}>{children}</Component>
      ) : AltComponent ? (
        <AltComponent {...rest}>{children}</AltComponent>
      ) : (
        <Redirect from='' to='login' noThrow />
      )
    }
  </AuthConsumer>
);
