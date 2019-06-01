import React from 'react';
import { Link } from '@reach/router';
import { UikTopBarLinkContainer, UikTopBarLink } from '../../@uik';

export const TopBarCoach = () => {
  return (
    <UikTopBarLinkContainer>
      <UikTopBarLink
        Component={Link}
        to='/report/list'
        style={{ textDecoration: 'none' }}
      >
        Reports
      </UikTopBarLink>
      <UikTopBarLink
        Component={Link}
        to='/group'
        style={{ textDecoration: 'none' }}
      >
        Group
      </UikTopBarLink>
    </UikTopBarLinkContainer>
  );
};
