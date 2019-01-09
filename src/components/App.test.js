import React from 'react';
import {shallow} from 'enzyme';

import {App} from './app.js';

describe('<App/>', () => {
    it.only('Renders without crashing', () => {
        shallow(<App />);
    });
});
