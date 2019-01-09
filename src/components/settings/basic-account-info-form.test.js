import React from 'react';
import {shallow} from 'enzyme';

import {BasicAccountInfoForm} from './basic-account-info-form';

describe('<BasicAccountInfoForm/>', () => {
  let initialValues= {
  }
    it('Renders without crashing', () => {
        shallow(<BasicAccountInfoForm handleSubmit={()=>{}} initialValues={initialValues} />);
    });
});
