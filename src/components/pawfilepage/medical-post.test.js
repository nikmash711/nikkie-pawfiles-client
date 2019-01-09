import React from 'react';
import {shallow} from 'enzyme';

import {MedicalPost} from './medical-post';

describe('<MedicalPost/>', () => {
  let props = {
    date: "2017-10-26",
    doctor: "Dr. Moon",
    id: "222222222222222222222202",
    notes: "Gave her fluids for the day. Wont let her eat until tomorrow. Try laxatives.",
    postId: "222222222222222222222202",
    prescriptions: ["Frontline flea"],
    symptoms: ["lethargic", "no appetite"],
    title: "Shes throwing up again:",
    type: "medical",
    userId: "000000000000000000000001",
    vaccinations: ["rabies"],
  }
    it('Renders without crashing', () => {
        shallow(<MedicalPost {...props} />);
    });
});
