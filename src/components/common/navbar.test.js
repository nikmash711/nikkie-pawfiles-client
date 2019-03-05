import React from 'react';
import {shallow} from 'enzyme';

import {Navbar} from './navbar';

describe('<Navbar/>', () => {
    it('Renders without crashing', () => {
        shallow(<Navbar />);
    });
});
