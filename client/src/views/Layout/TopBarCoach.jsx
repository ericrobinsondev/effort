import React from 'react';
import { Link } from '@reach/router';
import { UikTopBarLinkContainer, UikTopBarLink } from '../../@uik';

export const TopBarCoach = () => {
  return (
    <UikTopBarLinkContainer>
      <UikTopBarLink Component={Link} to='/reports'>
        Reports
      </UikTopBarLink>
      <UikTopBarLink Component={Link} to='/group'>
        Group
      </UikTopBarLink>
    </UikTopBarLinkContainer>
  );
};
