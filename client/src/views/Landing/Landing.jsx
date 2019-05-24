import React from 'react';
import { Link } from '@reach/router';

export const Landing = props => {
  return (
    <div id='root'>
      <div className='uik-App__app'>
        <div className='uik-buildings-signup__pageWrapper'>
          <div className='uik-widget__wrapper uik-buildings-signup__widgetWrapper'>
            <div className='uik-buildings-signup__content'>
              <div className='uik-widget-content__wrapper uik-buildings-signup__left'>
                <h2 className='uik-headline__wrapper'>
                  Welcome to Measure Effort
                </h2>
                <p className='uik-headline-desc__wrapper'>
                  Change How You Raise Support
                </p>
                <p>
                  Please <Link to='/login'>login</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
