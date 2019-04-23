import React from 'react';
import { Login } from '../Login';
import { render, cleanup } from 'react-testing-library';
import { AuthConsumer, AuthContext } from '../../utils/AuthContext';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Login', () => {
  it('should show logout button when authenticated', () => {
    const tree = (
      <AuthContext.Provider value={{ isAuth: true }}>
        <Login />
      </AuthContext.Provider>
    );

    const { getByText } = render(tree);
    const logoutButton = getByText(/logout/);
    expect(logoutButton).toBeInTheDocument();
  });

  it('should show login form when unauthenticated', () => {
    const tree = (
      <AuthContext.Provider value={{ isAuth: false }}>
        <Login />
      </AuthContext.Provider>
    );

    const { getByText } = render(tree);
    expect(getByText(/Email/)).toBeInTheDocument();
    expect(getByText(/Password/)).toBeInTheDocument();
  });
});
