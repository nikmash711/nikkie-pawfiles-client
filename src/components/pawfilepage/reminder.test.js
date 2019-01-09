import React from 'react';
import {shallow} from 'enzyme';

import {Reminder} from './reminder';

describe('<Reminder/>', () => {
    it('Renders without crashing', () => {
        shallow(<Reminder />);
    });
});
