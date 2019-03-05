import React from 'react';
import {shallow} from 'enzyme';

import {PawfileForm} from './pawfile-form';

describe('<PawfileForm/>', () => {
    let initialValues= {
        name: "",
        img:"",
        species: "",
        gender: "",
        breed: "",
        weight: "",
        birthday:"",
        bio:"",
    }
    
    it('Renders without crashing', () => {
        shallow(<PawfileForm handleSubmit={()=>{}} initialValues={initialValues} />);
    });
});
