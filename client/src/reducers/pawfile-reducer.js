import {SHOW_PAWFILE_FORM, SUBMIT_NEW_PAWFILE, SORTING_ALL_PETS, ADDING_NEW_REMINDER, DELETE_PAWFILE, TOGGLE_NAVBAR} from '../actions/index';

const initialState = {
  user: {firstName: 'Nikkie', lastName: "Mashian"},
  sortingPetsMethod: "",
  showPawfileForm: false,
  currentPetId: undefined,
  toggleNavbar:false,
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
          date: "2018-12-24",
          time: ""
        },
        {
          note: "Vet Appointment",
          date: "2018-12-30",
        },
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

  if(action.type=== SHOW_PAWFILE_FORM){
    return Object.assign({}, state, {
      showPawfileForm: action.bool,
      currentPetId: action.id
    })
  }

  else if (action.type=== SUBMIT_NEW_PAWFILE){
    //if its editing a current pawfile: 
    if(action.id>=0){
      const updatedValues = action.values;
      let pawfileToUpdate = state.pawfiles[action.id];

      //merge updated values with other stuff in the pawfile: 
      let updatedPawfile = Object.assign({}, pawfileToUpdate, updatedValues)

      const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.id ? updatedPawfile : item))
  
      return Object.assign({}, state, {
          pawfiles: newArrayOfPawfiles
      })
    }
    //if its a new pawfile: 
    return Object.assign({}, state, {
      pawfiles: [
        ...state.pawfiles,
        action.values
      ],
    })
  }

  else if(action.type===DELETE_PAWFILE){
    console.log('deleting pawfile');
    // const pawfileToDelete = state.pawfiles[action.id];
    
    const newArrayOfPawfiles = state.pawfiles.filter((item)=> (item.id!==action.id));

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles,
    })
  }

  else if (action.type=== ADDING_NEW_REMINDER){
    const newNote = action.values;
    //First, find the file with the ID you want. Then construct a new file object - stick it in a variable.
    const pawfileToUpdate = state.pawfiles[action.id];
    pawfileToUpdate.reminders=[...pawfileToUpdate.reminders, newNote];
    //  build up a new array of files. It should have all the old files, but in place of the one with the ID you want to change, you drop in the new file object from the variable you just created.
    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.id ? pawfileToUpdate : item))

    return Object.assign({}, state, {
        pawfiles: newArrayOfPawfiles
    })
  }

  else if (action.type=== SORTING_ALL_PETS){
    console.log('in reducer valye is', action.sortMethod);
    return Object.assign({}, state, {
      sortingPetsMethod: action.sortMethod,
    })
  }

  else if (action.type===TOGGLE_NAVBAR){
    if(action.bool===true ||action.bool===false){
      return Object.assign({}, state, {
        toggleNavbar: action.bool,
      })
    }
    return Object.assign({}, state, {
      toggleNavbar: !state.toggleNavbar,
    })
  }

  return state;
}