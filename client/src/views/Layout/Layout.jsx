import React from 'react';
import { TopBar } from './TopBar';

export const Layout = props => {
  return (
    <div>
      <TopBar />
      {props.children}
    </div>
  );
};
