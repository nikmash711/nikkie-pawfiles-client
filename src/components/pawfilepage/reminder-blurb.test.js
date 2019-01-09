import React from 'react';
import {shallow} from 'enzyme';

import {ReminderBlurb} from './reminder-blurb';

describe('<ReminderBlurb/>', () => {
    it('Renders without crashing', () => {
        shallow(<ReminderBlurb reminders={[{date: "2019-10-26", id: "333333333333333333333301", note: "Trim Nails", time: "18:00", userId: "000000000000000000000001"}]} />);
    });
});
