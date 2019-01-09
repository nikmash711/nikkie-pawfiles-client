import React from 'react';
import {shallow} from 'enzyme';

import {PawfileForm} from './pawfile-form';

describe('<PawfileForm/>', () => {
    it('Renders without crashing', () => {
        shallow(<PawfileForm />);
    });
});
