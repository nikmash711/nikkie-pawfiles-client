import React from 'react';
import {shallow} from 'enzyme';

import {AddNewPawfileButton} from './add-new-pawfile-button';

describe('<AddNewPawfileButton/>', () => {
    it('Renders without crashing', () => {
        shallow(<AddNewPawfileButton />);
    });
});
