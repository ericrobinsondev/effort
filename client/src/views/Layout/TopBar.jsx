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
import { TopBarCoach } from './TopBarCoach';

export const TopBar = () => {
  return (
    <AuthConsumer>
      {({ logout, isCoach }) => (
        <UikTopBar>
          <UikTopBarSection>
            <Link to='/'>
              <UikTopBarTitle>Measure Effort</UikTopBarTitle>
            </Link>
            <UikDivider margin vertical />
            {isCoach() ? (
              <TopBarCoach />
            ) : (
              <UikTopBarLinkContainer>
                <UikTopBarLink Component={Link} to='/report/current'>
                  Current Report
                </UikTopBarLink>
                <UikTopBarLink Component={Link} to='/group'>
                  Group
                </UikTopBarLink>
              </UikTopBarLinkContainer>
            )}
          </UikTopBarSection>

          <UikTopBarSection>
            <UikButton primary onClick={logout}>
              Logout
            </UikButton>
          </UikTopBarSection>
        </UikTopBar>
      )}
    </AuthConsumer>
  );
};
