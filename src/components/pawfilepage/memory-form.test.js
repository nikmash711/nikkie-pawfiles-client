import React from 'react';
import {shallow} from 'enzyme';

import {MemoryForm} from './memory-form';

describe('<MemoryForm/>', () => {
  let initialValues= {
}
    it('Renders without crashing', () => {
        shallow(<MemoryForm handleSubmit={()=>{}} initialValues={initialValues} />);
    });
});
