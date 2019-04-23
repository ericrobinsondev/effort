import React from 'react';
import { render, fireEvent, cleanup } from 'react-testing-library';
import { TopBar } from '../Layout/TopBar';
import { AuthContext } from '../../utils/AuthContext';
import 'jest-dom/extend-expect';

afterEach(cleanup);

const mockLogout = jest.fn();

describe('<TopBar />', () => {
  it('should render correctly', () => {
    const tree = (
      <AuthContext.Provider value={{ logout: mockLogout }}>
        <TopBar />
      </AuthContext.Provider>
    );

    expect(render(tree)).toMatchSnapshot();
  });

  it('should be connected to AuthContext logout', () => {
    const tree = (
      <AuthContext.Provider value={{ logout: mockLogout }}>
        <TopBar />
      </AuthContext.Provider>
    );

    const { getByText } = render(tree);
    expect(getByText(/Logout/)).toBeInTheDocument();

    fireEvent.click(getByText(/Logout/));
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});
