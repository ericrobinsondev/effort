import React from 'react';
import { ProtectedRoute } from '../ProtectedRoute';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { AuthContext } from '../../utils/AuthContext';
import { Redirect as MockRedirect } from '@reach/router';

afterEach(cleanup, () => {
  MockRedirect.mockClear();
});

const ProtectedComponent = () => {
  return <div>Protected Component</div>;
};

const AltComponent = () => {
  return <div>Alternate Component</div>;
};

jest.mock('@reach/router', () => {
  const RouterMocks = jest.requireActual('@reach/router');
  return {
    ...RouterMocks,
    Redirect: jest.fn().mockImplementation(() => {
      return <span>Redirect</span>;
    })
  };
});

describe('ProtectedRoutes', () => {
  it('should show component when authenticated', () => {
    const tree = (
      <AuthContext.Provider value={{ isAuth: true }}>
        <ProtectedRoute
          path='/'
          component={ProtectedComponent}
          altComponent={AltComponent}
        />
      </AuthContext.Provider>
    );

    const { getByText } = render(tree);
    expect(getByText(/Component/)).toHaveTextContent('Protected Component');
  });

  it('should show altComponent when unauthenticated', () => {
    const tree = (
      <AuthContext.Provider value={{ isAuth: false }}>
        <ProtectedRoute
          path='/'
          component={ProtectedComponent}
          altComponent={AltComponent}
        />
      </AuthContext.Provider>
    );

    const { getByText } = render(tree);
    expect(getByText(/Component/)).toHaveTextContent('Alternate Component');
  });

  it('should show ProtectedComponent when no altComponent given', () => {
    const tree = (
      <AuthContext.Provider value={{ isAuth: true }}>
        <ProtectedRoute path='/' component={ProtectedComponent} />
      </AuthContext.Provider>
    );

    const { getByText } = render(tree);
    expect(getByText(/Component/)).toHaveTextContent('Protected Component');
  });

  it('should redirect to login page when unauthenticated', () => {
    const tree = (
      <AuthContext.Provider value={{ isAuth: false }}>
        <ProtectedRoute path='/' component={ProtectedComponent} />
      </AuthContext.Provider>
    );

    const { getByText } = render(tree);
    expect(getByText(/Redirect/)).toHaveTextContent('Redirect');
    expect(MockRedirect).toHaveBeenCalledTimes(1);
  });
});
