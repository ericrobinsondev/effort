import React from 'react';
import { render } from 'react-testing-library';
import 'jest-dom/extend-expect';
import { LoginForm } from '../Login/LoginForm';

describe('LoginForm', () => {
  it('renders the component', () => {
    const tree = render(<LoginForm />);
    expect(tree).toMatchSnapshot();
  });
});
