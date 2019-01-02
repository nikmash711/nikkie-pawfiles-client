import {SHOW_PAWFILE_FORM, CHANGE_SORTING_PETS_METHOD, ADDING_NEW_REMINDER, TOGGLE_NAVBAR, DELETE_REMINDER, CHANGE_CURRENT_PET_ID, SHOW_MEDICAL_FORM, SUBMIT_MEDICAL_FORM, SHOW_MEMORY_FORM, SUBMIT_MEMORY_FORM, CHANGE_SEARCH_TERM, CHANGE_CATEGORY_FILTER,} from '../actions/index';

import {FETCH_PAWFILES_SUCCESS, FETCH_INDIVIDUAL_PAWFILE_SUCCESS, CHANGE_PAWFILES_PENDING, CHANGE_INDIVIDUAL_PAWFILE_PENDING, FETCH_INDIVIDUAL_PAWFILE_REQUEST, FETCH_INDIVIDUAL_PAWFILE_ERROR, CHANGE_ERROR, SUBMIT_PAWFILE_REQUEST, SUBMIT_PAWFILE_SUCCESS, DELETE_PAWFILE_REQUEST, DELETE_PAWFILE_SUCCESS} from '../actions/pawfile-crud'

//dummy initial state 
const initialState = {
  user: {firstName: 'Nikkie', lastName: 'Mashian'},
  sortingPetsMethod: "",
  showPawfileForm: false,
  showMedicalForm: false,
  showMemoryForm: false,
  currentPetId: undefined,
  currentSearchTerm: "",
  categoryFilter: "",
  toggleNavbar:false,
  pawfiles: [],
  individualPawfile: {},
  pawfilesPending: true,
  individualPawfilePending: true,
  error:""
};

export const pawfileReducer = (state = initialState, action)=> {

  //Either when user clicks "add new pawfile", or clicks to edit a current pawfile. Need to set the currentPetId to either the id of the pet being edited, or undefined if it's a new pet/closing form
  if(action.type=== SHOW_PAWFILE_FORM){
    return Object.assign({}, state, {
      showPawfileForm: action.bool,
      currentPetId: action.currentPetId
    })
  }

  else if(action.type===SUBMIT_MEDICAL_FORM){
    let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

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

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles
    })
  }

  else if(action.type===SUBMIT_MEMORY_FORM){
    let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

    let previousPosts = pawfileToUpdate.posts ? [...pawfileToUpdate.posts] : '';

    if(previousPosts){
      pawfileToUpdate.posts = [...pawfileToUpdate.posts, action.values];
    }
    else{
      pawfileToUpdate.posts = [action.values];
    }

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles
    })
  }

  else if (action.type=== ADDING_NEW_REMINDER){
    const newReminder = action.values;

    //create a new obj -this was the problem (I was directly mutating state)
    let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

    let previousReminders = pawfileToUpdate.reminders ? [...pawfileToUpdate.reminders] : '';

    //
    if(previousReminders){
      pawfileToUpdate.reminders=[...pawfileToUpdate.reminders, newReminder];
    }
    else{
      pawfileToUpdate.reminders=[newReminder];
    }

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

    return Object.assign({}, state, {
        pawfiles: newArrayOfPawfiles
    })
  }

  else if(action.type=== DELETE_REMINDER){
    let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

    const updatedReminders = pawfileToUpdate.reminders.filter((reminder)=> (reminder.id!==action.reminderId));

    pawfileToUpdate.reminders=updatedReminders;

    // const updatedPawfile = Object.assign({}, state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId), {
    //   pawfileToUpdate
    // })

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

    console.log('newArrayOfPawfiles is', newArrayOfPawfiles)

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

  else if(action.type===CHANGE_ERROR){
    return Object.assign({}, state, {
      error: action.bool,
    })
  }

  else if (action.type === FETCH_PAWFILES_SUCCESS) {
    console.log('in success, fetched', action.pawfiles);
    return Object.assign({}, state, {
      pawfiles: action.pawfiles,
      pawfilesPending: false,
    })
  }

  else if (action.type===FETCH_INDIVIDUAL_PAWFILE_SUCCESS){
    console.log('in success for indiv pawfile, fetched', action.pawfile);
    return Object.assign({}, state, {
      individualPawfile: action.pawfile,
      individualPawfilePending: false,
    })
  }

  else if (action.type===FETCH_INDIVIDUAL_PAWFILE_REQUEST){
    return Object.assign({}, state, {
      individualPawfilePending: true,
    })
  }

  else if (action.type===FETCH_INDIVIDUAL_PAWFILE_ERROR){
    console.log('in error of fetching');
    return Object.assign({}, state, {
      individualPawfilePending: false,
      error: true,
    })
  }

  else if(action.type===CHANGE_PAWFILES_PENDING){
    console.log('changing pending to', action.bool);
    return Object.assign({}, state, {
      pawfilesPending: action.bool,
    })
  }

  else if(action.type===  CHANGE_INDIVIDUAL_PAWFILE_PENDING){
    return Object.assign({}, state, {
      individualPawfilePending: action.bool,
    })
  }

  else if (action.type===SUBMIT_PAWFILE_REQUEST){
    return Object.assign({}, state, {
      pawfilesPending: true,
    })
  }

  else if(action.type===SUBMIT_PAWFILE_SUCCESS){
    //if its editing an existing pawfile: 
    if(action.currentPetId){
      console.log('updating in reducer with pawfile', action.pawfile);
      const updatedPawfile = action.pawfile;

      const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? updatedPawfile : item))
  
      return Object.assign({}, state, {
          pawfiles: newArrayOfPawfiles,
          // individualPawfile: action.pawfile,
          pawfilesPending: false,
      })
    }

    //if its a new obj
    return Object.assign({}, state, {
      pawfiles: [
        ...state.pawfiles,
        action.pawfile
      ],
      pawfilesPending: false,
    })
  }

  else if (action.type===DELETE_PAWFILE_REQUEST){
    return Object.assign({}, state, {
      pawfilesPending: true,
    })
  }

  else if(action.type===DELETE_PAWFILE_SUCCESS){
    console.log('in deleting success reducer')
    const newArrayOfPawfiles = state.pawfiles.filter((pawfile)=> (pawfile.id!==action.currentPetId));

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles,
      pawfilesPending: false,
    })
  }

  return state;
}

//load all the pawfiles in state regardless of page, and then display what you want from that state. differentiate state from display. 
