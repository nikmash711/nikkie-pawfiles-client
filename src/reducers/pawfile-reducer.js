import {SHOW_PAWFILE_FORM, CHANGE_SORTING_PETS_METHOD, TOGGLE_NAVBAR, SHOW_MEDICAL_FORM, SHOW_MEMORY_FORM, SHOW_REMINDER_FORM, CHANGE_SEARCH_TERM, CHANGE_CATEGORY_FILTER, CHANGE_CURRENT_PET_ID} from '../actions/index';

import {FETCH_PAWFILES_SUCCESS, FETCH_PAWFILES_REQUEST, CHANGE_PAWFILES_PENDING, CHANGE_ERROR, SUBMIT_PAWFILE_REQUEST, SUBMIT_PAWFILE_SUCCESS, DELETE_PAWFILE_REQUEST, DELETE_PAWFILE_SUCCESS} from '../actions/pawfile-crud'

import {SUBMIT_REMINDER_REQUEST, SUBMIT_REMINDER_SUCCESS, CRUD_ERROR, DELETE_REMINDER_REQUEST, DELETE_REMINDER_SUCCESS} from '../actions/reminder-crud'

import {SUBMIT_POST_REQUEST, SUBMIT_POST_SUCCESS, DELETE_POST_REQUEST, DELETE_POST_SUCCESS} from '../actions/post-crud'


//dummy initial state 
const initialState = {
  user: {firstName: 'Nikkie', lastName: 'Mashian'},
  sortingPetsMethod: "",
  showPawfileForm: false,
  showMedicalForm: false,
  showMemoryForm: false,
  showReminderForm: false,
  currentSearchTerm: "",
  categoryFilter: "",
  toggleNavbar:false,

  currentPawfileFormId: undefined,
  currentPetId: undefined,
  currentPostId: undefined,
  currentReminderId: undefined,
  pawfiles: [],
  pawfilesPending: true,
  error: false,
};

export const pawfileReducer = (state = initialState, action)=> {

  /* GENERAL STUFF */

  //Either when user clicks "add new pawfile", or clicks to edit a current pawfile.
  if(action.type=== SHOW_PAWFILE_FORM){
    console.log('IN SHOW reducer, currentPawfileFormId is', action.currentPawfileFormId)
    return Object.assign({}, state, {
      showPawfileForm: action.bool,
      currentPawfileFormId: action.currentPawfileFormId
    })
  }

  else if(action.type===CHANGE_CURRENT_PET_ID){
    return Object.assign({}, state, {
      currentPetId: action.currentPetId,
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
    console.log('the bool is', action.bool)
    return Object.assign({}, state, {
      toggleNavbar: !state.toggleNavbar,
    })
  }

  else if(action.type===SHOW_REMINDER_FORM){
    console.log('in show reminder form reducer');
    return Object.assign({}, state, {
      showReminderForm: action.bool,
      currentReminderId: action.currentReminderId,
    })
  }

  else if(action.type===SHOW_MEDICAL_FORM){
    return Object.assign({}, state, {
      showMedicalForm: action.bool,
      currentPostId: action.currentPostId,
    })
  }

  else if(action.type===SHOW_MEMORY_FORM){
    return Object.assign({}, state, {
      showMemoryForm: action.bool,
      currentPostId: action.currentPostId,
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

  /* CRUD-RELATED STUFF */

  else if(action.type===CHANGE_ERROR){
    return Object.assign({}, state, {
      error: action.bool,
    })
  }  
  
  else if (action.type===CRUD_ERROR){
    return Object.assign({}, state, {
      pawfilesPending: false,
      error: true,
    })
  }

  else if(action.type===CHANGE_PAWFILES_PENDING){
    console.log('changing pending to', action.bool);
    return Object.assign({}, state, {
      pawfilesPending: action.bool,
    })
  }

  else if (action.type === FETCH_PAWFILES_REQUEST) {
    return Object.assign({}, state, {
      pawfilesPending: true,
    })
  }

  else if (action.type === FETCH_PAWFILES_SUCCESS) {
    console.log('successfully fetching all pawfiles', action.pawfiles);
    return Object.assign({}, state, {
      pawfiles: action.pawfiles,
      pawfilesPending: false,
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
    console.log('POST in reducer with pawfile', action.pawfile);
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

  // FOR REMINDER: 
  else if (action.type===SUBMIT_REMINDER_REQUEST){
    return Object.assign({}, state, {
      pawfilesPending: true,
    })
  }

  else if (action.type=== SUBMIT_REMINDER_SUCCESS){
    //figure out which pawfile I need to updated 
    let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

    //if I'm editing a reminder: 
    if(action.reminderId){
      console.log('EDITING');
      let reminderToUpdate = action.reminder;
      pawfileToUpdate.reminders = pawfileToUpdate.reminders.map((reminder)=> (reminder.id==action.reminderId ? reminderToUpdate : reminder))
    }
    //if I'm adding a reminder: 
    else{
      pawfileToUpdate.reminders = [...pawfileToUpdate.reminders, action.reminder];
    }

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

    console.log('in reminder reducer, new array of apwfiles is', newArrayOfPawfiles);
    return Object.assign({}, state, {
        pawfilesPending: false,
        pawfiles: newArrayOfPawfiles
    })
  }

  else if (action.type===DELETE_REMINDER_REQUEST){
    return Object.assign({}, state, {
      pawfilesPending: true,
    })
  }

  else if(action.type=== DELETE_REMINDER_SUCCESS){
    let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

    const updatedReminders = pawfileToUpdate.reminders.filter((reminder)=> (reminder.id!==action.reminderId));

    pawfileToUpdate.reminders=updatedReminders;


    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles,
      pawfilesPending: false,
    })
  }

  /* POSTS */
  else if (action.type===SUBMIT_POST_REQUEST){
    return Object.assign({}, state, {
      pawfilesPending: true,
    })
  }

  else if (action.type=== SUBMIT_POST_SUCCESS){
    //figure out which pawfile I need to updated 
    let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

    //if I'm editing a post: 
    if(action.postId){
      console.log('EDITING');
      let postToUpdate = action.post;
      pawfileToUpdate.posts = pawfileToUpdate.posts.map((post)=> (post.id==action.postId ? postToUpdate : post))
    }
    //if I'm adding a post: 
    else{
      pawfileToUpdate.posts = [...pawfileToUpdate.posts, action.post];
    }

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

    console.log('in reminder reducer, new array of apwfiles is', newArrayOfPawfiles);
    return Object.assign({}, state, {
        pawfilesPending: false,
        pawfiles: newArrayOfPawfiles
    })
  }

  else if (action.type===DELETE_POST_REQUEST){
    return Object.assign({}, state, {
      pawfilesPending: true,
    })
  }

  else if(action.type=== DELETE_POST_SUCCESS){
    let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

    console.log('in deleting post reducer, pawfile to update is', pawfileToUpdate, 'post to update is', action.postId);

    const updatedPosts = pawfileToUpdate.posts.filter((post)=> (post.id!==action.postId));

    pawfileToUpdate.posts=updatedPosts;

    const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

    console.log('in deleting post reducer, new array is', newArrayOfPawfiles);

    return Object.assign({}, state, {
      pawfiles: newArrayOfPawfiles,
      pawfilesPending: false,
    })
  }

  // else if(action.type===SUBMIT_MEDICAL_FORM){
  //   let pawfileToUpdate = {...state.pawfiles.find(pawfile=> pawfile.id==action.currentPetId)};

  //   //check if there's any previous posts for this pet. How we handle adding the new post depends on this.
  //   let previousPosts = pawfileToUpdate.posts ? [...pawfileToUpdate.posts] : '';

  //   if(previousPosts){
  //     pawfileToUpdate.posts = [...pawfileToUpdate.posts, action.values];
  //   }
  //   else{
  //     pawfileToUpdate.posts = [action.values];
  //   }

  //   //check if there's any previous vaccinations, prescriptions, etc. for this pet. How we handle adding the new ones depends on this.
  //   if(action.values.vaccinations)
  //   {
  //     let vaccinationList = action.values.vaccinations.map(vaccination=>{
  //       return {name: vaccination, date: action.values.date}
  //     })

  //     let previousVaccinations = pawfileToUpdate.vaccinations  ? [...pawfileToUpdate.vaccinations ] : '';

  //     if(previousVaccinations){
  //       pawfileToUpdate.vaccinations = [...pawfileToUpdate.vaccinations, ...vaccinationList];      
  //     }
  //     else{
  //       pawfileToUpdate.vaccinations = [...vaccinationList];
  //     }
  //   }

  //   if(action.values.prescriptions)
  //   {
  //     let prescriptionList = action.values.prescriptions.map(prescription=>{
  //       return {name: prescription, date: action.values.date}
  //     })

  //     let previousPrescriptions = pawfileToUpdate.prescriptions  ? [...pawfileToUpdate.prescriptions ] : '';

  //     if(previousPrescriptions){
  //       pawfileToUpdate.prescriptions = [...pawfileToUpdate.prescriptions, ...prescriptionList];
     
  //     }
  //     else{
  //       pawfileToUpdate.prescriptions = [...prescriptionList];
  //     }
  //   }

  //   const newArrayOfPawfiles = state.pawfiles.map((item)=> (item.id==action.currentPetId ? pawfileToUpdate : item))

  //   return Object.assign({}, state, {
  //     pawfiles: newArrayOfPawfiles
  //   })
  // }

  return state;
}


//load all the pawfiles in state regardless of page, and then display what you want from that state. differentiate state from display. 