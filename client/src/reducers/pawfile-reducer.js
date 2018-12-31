import {SHOW_PAWFILE_FORM, SUBMIT_PAWFILE, CHANGE_SORTING_PETS_METHOD, ADDING_NEW_REMINDER, DELETE_PAWFILE, TOGGLE_NAVBAR, DELETE_REMINDER, CHANGE_CURRENT_PET_ID, SHOW_MEDICAL_FORM, SUBMIT_MEDICAL_FORM, SHOW_MEMORY_FORM, SUBMIT_MEMORY_FORM, CHANGE_SEARCH_TERM, CHANGE_CATEGORY_FILTER} from '../actions/index';

//dummy initial state 
const initialState = {
  user: {firstName: 'Nikkie', lastName: "Mashian"},
  sortingPetsMethod: "",
  showPawfileForm: false,
  showMedicalForm: false,
  showMemoryForm: false,
  currentPetId: undefined,
  currentSearchTerm: "",
  categoryFilter: "",
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
          date: 'Fri Dec 14 2018',
          description: 'I walked into the living room and saw her opening it with her claws. How dare she!',
          memory_img: 'https://i.ibb.co/y8hFnkL/2.jpg'
        },
        {
          id: 1,
          type: 'medical',
          title: 'Shes throwing up again:(',
          date: 'Fri Dec 14 2017',
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

  //Either when user clicks "add new pawfile", or clicks to edit a current pawfile. Need to set the currentPetId to either the id of the pet being edited, or undefined if it's a new pet/closing form
  if(action.type=== SHOW_PAWFILE_FORM){
    return Object.assign({}, state, {
      showPawfileForm: action.bool,
      currentPetId: action.currentPetId
    })
  }

  else if (action.type=== SUBMIT_PAWFILE){
    //if its editing an existing pawfile: 
    if(action.currentPetId>=0){
      const updatedValues = action.values;
      let pawfileToUpdate = state.pawfiles[action.currentPetId];

      //merge updated values with rest of pawfile: 
      let updatedPawfile = Object.assign({}, pawfileToUpdate, updatedValues)

      const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.currentPetId ? updatedPawfile : item))
  
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
    let pawfileToUpdate = state.pawfiles[action.currentPetId];

    //check if there's any previous posts for this pet. How we handle adding the new post depends on this.
    let previousPosts = pawfileToUpdate.posts ? [...pawfileToUpdate.posts] : '';

    if(previousPosts){
      pawfileToUpdate.posts = [...pawfileToUpdate.posts, action.values];
    }
    else{
      pawfileToUpdate.posts = [action.values];
    }

    //check if there's any previous vaccinations, prescriptions, etc. for this pet. How we handle adding the new ones depends on this.
    if(action.values.vaccinations)
    {
      let vaccinationList = action.values.vaccinations.map(vaccination=>{
        return {name: vaccination, date: action.values.date}
      })

      let previousVaccinations = pawfileToUpdate.vaccinations  ? [...pawfileToUpdate.vaccinations ] : '';

      if(previousVaccinations){
        pawfileToUpdate.vaccinations = [...pawfileToUpdate.vaccinations, ...vaccinationList];      
      }
      else{
        pawfileToUpdate.vaccinations = [...vaccinationList];
      }
    }

    if(action.values.prescriptions)
    {
      let prescriptionList = action.values.prescriptions.map(prescription=>{
        return {name: prescription, date: action.values.date}
      })

      let previousPrescriptions = pawfileToUpdate.prescriptions  ? [...pawfileToUpdate.prescriptions ] : '';

      if(previousPrescriptions){
        pawfileToUpdate.prescriptions = [...pawfileToUpdate.prescriptions, ...prescriptionList];
     
      }
      else{
        pawfileToUpdate.prescriptions = [...prescriptionList];
      }
    }

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.currentPetId ? pawfileToUpdate : item))

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles
    })
  }

  else if(action.type===SUBMIT_MEMORY_FORM){
    let pawfileToUpdate = state.pawfiles[action.currentPetId];

    let previousPosts = pawfileToUpdate.posts ? [...pawfileToUpdate.posts] : '';

    if(previousPosts){
      pawfileToUpdate.posts = [...pawfileToUpdate.posts, action.values];
    }
    else{
      pawfileToUpdate.posts = [action.values];
    }

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.currentPetId ? pawfileToUpdate : item))

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles
    })
  }

  else if(action.type===DELETE_PAWFILE){
    const newArrayOfPawfiles = state.pawfiles.filter((item)=> (item.id!==action.currentPetId));

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles,
    })
  }

  else if (action.type=== ADDING_NEW_REMINDER){
    const newReminder = action.values;

    const pawfileToUpdate = state.pawfiles[action.currentPetId];

    let previousReminders = pawfileToUpdate.reminders ? [...pawfileToUpdate.reminders] : '';

    if(previousReminders){
      pawfileToUpdate.reminders=[...pawfileToUpdate.reminders, newReminder];
    }
    else{
      pawfileToUpdate.reminders=[newReminder];
    }

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.currentPetId ? pawfileToUpdate : item))

    return Object.assign({}, state, {
        pawfiles: newArrayOfPawfiles
    })
  }

  else if(action.type=== DELETE_REMINDER){
    let pawfileToUpdate =  state.pawfiles[action.currentPetId];

    const updatedReminders = pawfileToUpdate.reminders.filter((reminder)=> (reminder.id!==action.reminderId));

    pawfileToUpdate.reminders=updatedReminders;

    const updatedPawfile = Object.assign({},  state.pawfiles[action.currentPetId], {
      pawfileToUpdate
    })

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id===action.currentPetId ? updatedPawfile : item))

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles
    })
  }

  else if (action.type=== CHANGE_SORTING_PETS_METHOD){
    return Object.assign({}, state, {
      sortingPetsMethod: action.sortMethod,
    })
  }

  else if (action.type===TOGGLE_NAVBAR){
    if(action.bool===true || action.bool===false){
      return Object.assign({}, state, {
        toggleNavbar: action.bool,
      })
    }
    return Object.assign({}, state, {
      toggleNavbar: !state.toggleNavbar,
    })
  }

  else if(action.type===CHANGE_CURRENT_PET_ID){
    console.log('changing id', action.currentPetId);
    return Object.assign({}, state, {
      currentPetId: action.currentPetId
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

  else if(action.type===CHANGE_SEARCH_TERM){
    return Object.assign({}, state, {
      currentSearchTerm: action.searchTerm,
    })
  }

  else if(action.type===CHANGE_CATEGORY_FILTER){
    return Object.assign({}, state, {
      categoryFilter: action.categoryFilter,
    })
  }

  return state;
}