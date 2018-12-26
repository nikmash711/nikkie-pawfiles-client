import {ADDING_NEW_FORM, ADDING_NEW_PAWFILE} from '../actions/index';

const initialState = {
  user: {firstName: 'Nikkie', lastName: "Mashian"},
  addingNewPawfile: false,
  pawfiles: [
    {
      id: 0,
      name: "Mushy",
      species: "Cat",
      gender: "Female",
      breed: "Domestic Mix",
      birthday: "2016-10-26",
      bio: "Meow. I'm a cute troublemaker. I'll purr then hiss. Give me scritches?",
      img: "https://i.ibb.co/y8hFnkL/2.jpg",
      reminders: [
        {
          note: "Trim Nails",
          date: "12/24/18"
        },
        {
          note: "Vet Appointment",
          date: "12/30/18",
        },
        {
          note: "Trim Nails",
          date: "12/24/18"
        },
        {
          note: "Vet Appointment",
          date: "12/30/18",
        },
        {
          note: "Trim Nails",
          date: "12/24/18"
        },
        {
          note: "Vet Appointment",
          date: "12/30/18",
        }
      ],
      posts: [
        {
          id: 0,
          type: 'memory',
          title: 'Mushy learns how to open the door',
          date: '12/10/18',
          description: 'I walked into the living room and saw her opening it with her claws. How dare she!',
          img: 'https://i.ibb.co/y8hFnkL/2.jpg'
        },
        {
          id: 1,
          type: 'medical',
          title: 'Shes throwing up again:(',
          date: '11/10/18',
          symptoms: ['lethargic', 'no appetite'],
          doctor: 'Dr. Moon',
          office: '1234 Sesame St',
          diagnosis: 'Gave her fluids for the day. Wont let her eat until tomorrow. Try laxatives.',
        }
      ]
    },
    {
      id: 1,
      name: "Muffin",
      species: "Dog",
      gender: "Male",
      breed: "Pom/Yorkie Mix",
      birthday: "2010-01-10",
      bio: "Ruff. I want to always play and go on walks. Did you say snack?",
      img: "https://i.ibb.co/stMyFMp/IMG-6267.png",
      reminders: [
        {
          note: "Give Shot",
          date: "Daily"
        },
      ]
    },
   
  ]
};

export const pawfileReducer = (state = initialState, action)=> {

  if(action.type=== ADDING_NEW_FORM){
    return Object.assign({}, state, {
      addingNewPawfile: action.bool,
    })
  }

  else if (action.type=== ADDING_NEW_PAWFILE){
    return Object.assign({}, state, {
      pawfiles: [
        ...state.pawfiles,
        action.values
      ]
    })
  }
  return state;
}