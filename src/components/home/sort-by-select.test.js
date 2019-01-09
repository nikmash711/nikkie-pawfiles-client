import React from 'react';
import {shallow} from 'enzyme';

import {SortBySelect} from './sort-by-select';

describe('<SortBySelect/>', () => {
    it('Renders without crashing', () => {
        shallow(<SortBySelect />);
    });
});
