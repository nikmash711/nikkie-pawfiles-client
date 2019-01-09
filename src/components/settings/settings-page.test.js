import React from 'react';
import {shallow} from 'enzyme';

import {SettingsPage} from './settings-page';

describe('<SettingsPage/>', () => {
    it('Renders without crashing', () => {
        shallow(<SettingsPage />);
    });
});
