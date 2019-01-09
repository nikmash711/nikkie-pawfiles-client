import React from 'react';
import {shallow} from 'enzyme';

import {ChangePasswordForm} from './change-password-form';

describe('<ChangePasswordForm/>', () => {
  let initialValues= {
  }
    it('Renders without crashing', () => {
        shallow(<ChangePasswordForm handleSubmit={()=>{}} initialValues={initialValues} />);
    });
});
