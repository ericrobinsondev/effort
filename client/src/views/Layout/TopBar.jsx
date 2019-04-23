import React from 'react';
import { Link } from '@reach/router';
import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle,
  UikTopBarLinkContainer,
  UikTopBarLink,
  UikDivider,
  UikButton
} from '../../@uik';
import { AuthConsumer } from '../../utils/AuthContext';

export const TopBar = () => {
  return (
    <UikTopBar>
      <UikTopBarSection>
        <UikTopBarTitle>Measure Effort</UikTopBarTitle>
        <UikDivider margin vertical />
        <UikTopBarLinkContainer>
          <UikTopBarLink Component={Link} to='/'>
            Home
          </UikTopBarLink>
          <UikTopBarLink Component={Link} to='/current'>
            Current Report
          </UikTopBarLink>
          <UikTopBarLink Component={Link} to='/reports'>
            Reports
          </UikTopBarLink>
        </UikTopBarLinkContainer>
      </UikTopBarSection>

      <UikTopBarSection>
        <AuthConsumer>
          {({ logout }) => (
            <UikButton primary onClick={logout}>
              Logout
            </UikButton>
          )}
        </AuthConsumer>
      </UikTopBarSection>
    </UikTopBar>
  );
};
