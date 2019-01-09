import React from 'react';
import {shallow} from 'enzyme';

import {MemoryPost} from './memory-post';

describe('<MemoryPost/>', () => {
  let props = {
    date: "2017-10-26",
    title: "Shes throwing up again:",
    type: "memory",
  }
    it('Renders without crashing', () => {
        shallow(<MemoryPost {...props} />);
    });
});
