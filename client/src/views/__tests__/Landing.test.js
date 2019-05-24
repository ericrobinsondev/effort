import React from 'react';
import { Landing } from '../Landing';
import { render, cleanup } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

describe('Landing', () => {
  it('should show a link to login page', () => {
    const tree = <Landing />;

    const { getByText } = render(tree);
    const loginLink = getByText(/login/);
    expect(loginLink).toBeInTheDocument();
  });
});
