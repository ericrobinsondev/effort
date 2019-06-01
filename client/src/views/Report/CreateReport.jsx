import React, { Component } from 'react';
import { UikHeadline } from '../../@uik';
import { withAuthContext } from '../../utils/AuthContext';

export class CreateReport extends Component {
  render() {
    return <UikHeadline>Create Report</UikHeadline>;
  }
}

export default withAuthContext(CreateReport);
