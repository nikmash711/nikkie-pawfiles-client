import React from 'react';
import {shallow} from 'enzyme';

import {HomePage} from './homepage';

describe('<HomePage/>', () => {

    it('Renders without crashing', () => {
        shallow(<HomePage dispatch={()=>{}} />);
    });
});
