import React from 'react';
import {shallow} from 'enzyme';

import {PawfilePage} from './pawfilepage';

describe('<PawfilePage/>', () => {
  let props={
    pawfiles:[
      {
        bio: "Meow. I'm a cute troublemaker. I'll purr then hiss. Give me scritches?",
        birthday: "2016-10-26",
        breed: "Domestic Mix",
        gender: "Female",
        id: "111111111111111111111101",
        img: "https://i.ibb.co/y8hFnkL/2.jpg",
        name: "Mushy",
        species: "Cat",
        userId: "000000000000000000000001",
        weight: "8 lbs",
      }
    ],
    match:{
      params:{

      }
    }
  }
    it('Renders without crashing', () => {
        shallow(<PawfilePage {...props} dispatch={()=>{}}/>);
    });
});
