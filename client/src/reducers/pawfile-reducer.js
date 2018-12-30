import {SHOW_PAWFILE_FORM, SUBMIT_NEW_PAWFILE, SORTING_ALL_PETS, ADDING_NEW_REMINDER, DELETE_PAWFILE, TOGGLE_NAVBAR, DELETE_REMINDER, CHANGE_CURRENT_PET_ID, SHOW_MEDICAL_FORM, SUBMIT_MEDICAL_FORM, SHOW_MEMORY_FORM, SUBMIT_MEMORY_FORM} from '../actions/index';

const initialState = {
  user: {firstName: 'Nikkie', lastName: "Mashian"},
  sortingPetsMethod: "",
  showPawfileForm: false,
  showMedicalForm: false,
  showMemoryForm: false,
  currentPetId: undefined,
  toggleNavbar:false,
  pawfiles: [
    {
      id: 0,
      name: "Mushy",
      species: "Cat",
      gender: "Female",
      breed: "Domestic Mix",
      weight: '8 lbs',
      birthday: "2016-10-26",
      bio: "Meow. I'm a cute troublemaker. I'll purr then hiss. Give me scritches?",
      img: "https://i.ibb.co/y8hFnkL/2.jpg",
      reminders: [
        {
          id: 0,
          note: "Trim Nails",
          date: "2016-10-26",
        },
        {
          id: 1,
          note: "Vet Appointment",
          date: "2016-11-26",
        },
      ],
      posts: [
        {
          id: 0,
          type: 'memory',
          title: 'Mushy learns how to open the door',
          date: '2018-12-10',
          description: 'I walked into the living room and saw her opening it with her claws. How dare she!',
          memory_img: 'https://i.ibb.co/y8hFnkL/2.jpg'
        },
        {
          id: 1,
          type: 'medical',
          title: 'Shes throwing up again:(',
          date: '2018-11-10',
          symptoms: ['lethargic', 'no appetite'],
          vaccinations:['rabies'],
          prescriptions:['Frontline flea'],
          doctor: 'Dr. Moon',
          notes: 'Gave her fluids for the day. Wont let her eat until tomorrow. Try laxatives.',
        }
      ],
      vaccinations: [
        {
          name: 'Rabies',
          date: '2018-10-12'
        }
      ],
      prescriptions:[]
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
          id: 0,
          note: "Give Shot",
          date: "Daily"
        },
      ]
    },
   
  ]
};

export const pawfileReducer = (state = initialState, action)=> {

  if(action.type=== SHOW_PAWFILE_FORM){
    console.log('changing petid')
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

  else if(action.type===SUBMIT_MEDICAL_FORM){
    let pawfileToUpdate = state.pawfiles[action.id];

    pawfileToUpdate.posts = [...pawfileToUpdate.posts, action.values];

    //this method only works if the pet has an existing or blank vaccination/prescription prop -- how will this work with backend?
    if(action.values.vaccinations){
      let vaccinationList = action.values.vaccinations.map(vaccination=>{
        return {name: vaccination, date: action.values.date}
      })
      pawfileToUpdate.vaccinations = [...pawfileToUpdate.vaccinations, ...vaccinationList];
    }

    if(action.values.prescriptions){
      let prescriptionList = action.values.prescriptions.map(prescription=>{
        return {name: prescription, date: action.values.date}
      })
      pawfileToUpdate.prescriptions = [...pawfileToUpdate.prescriptions, ...prescriptionList];
    }

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.id ? pawfileToUpdate : item))

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles
  })
  }

  else if(action.type===SUBMIT_MEMORY_FORM){
    let pawfileToUpdate = state.pawfiles[action.id];

    pawfileToUpdate.posts = [...pawfileToUpdate.posts, action.values];

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.id ? pawfileToUpdate : item))

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles
  })
  }

  else if(action.type===DELETE_PAWFILE){
    const newArrayOfPawfiles = state.pawfiles.filter((item)=> (item.id!==action.id));

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles,
    })
  }

  else if (action.type=== ADDING_NEW_REMINDER){
    const newReminder = action.values;
    //First, find the file with the ID you want. Then construct a new file object - stick it in a variable.
    const pawfileToUpdate = state.pawfiles[action.id];
    pawfileToUpdate.reminders=[...pawfileToUpdate.reminders, newReminder];
    //  build up a new array of files. It should have all the old files, but in place of the one with the ID you want to change, you drop in the new file object from the variable you just created.
    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.id ? pawfileToUpdate : item))

    return Object.assign({}, state, {
        pawfiles: newArrayOfPawfiles
    })
  }

  else if(action.type=== DELETE_REMINDER){
    let pawfileToUpdate =  state.pawfiles[action.petId];

    const updatedReminders = pawfileToUpdate.reminders.filter((reminder)=> (reminder.id!==action.reminderId));

    pawfileToUpdate.reminders=updatedReminders;

    const updatedPawfile = Object.assign({},  state.pawfiles[action.petId], {
      pawfileToUpdate
    })

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.petId ? updatedPawfile : item))

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

  else if(action.type===CHANGE_CURRENT_PET_ID){
    console.log('changing id', action.id);
    return Object.assign({}, state, {
      currentPetId: action.id
    })
  }

  else if(action.type===SHOW_MEDICAL_FORM){
    return Object.assign({}, state, {
      showMedicalForm: action.bool
    })
  }

  else if(action.type===SHOW_MEMORY_FORM){
    return Object.assign({}, state, {
      showMemoryForm: action.bool
    })
  }

  return state;
}