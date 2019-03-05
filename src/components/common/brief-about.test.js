import React from 'react';
import {shallow} from 'enzyme';

import BriefAbout from './brief-about';

describe('<BriefAbout/>', () => {
    it('Renders without crashing', () => {
        shallow(<BriefAbout />);
    });
});
