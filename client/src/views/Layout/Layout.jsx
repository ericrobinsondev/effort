import React from 'react';
import { TopBar } from './TopBar';

export const Layout = props => {
  return (
    <div>
      <TopBar />
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {props.children}
      </div>
    </div>
  );
};
