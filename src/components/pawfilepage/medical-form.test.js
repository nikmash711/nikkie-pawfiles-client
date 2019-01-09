import React from 'react';
import {shallow} from 'enzyme';

import {MedicalForm} from './medical-form';

describe('<MedicalForm/>', () => {
  let initialValues= {
}
    it('Renders without crashing', () => {
        shallow(<MedicalForm handleSubmit={()=>{}} initialValues={initialValues} />);
    });
});
