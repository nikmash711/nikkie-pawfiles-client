import {API_BASE_URL} from '../config';

export const SHOW_PAWFILE_FORM = 'SHOW_PAWFILE_FORM';
export const showPawfileForm = (bool, currentPetId) => ({
    type: SHOW_PAWFILE_FORM,
    bool,
    currentPetId
});

export const SUBMIT_MEDICAL_FORM = 'SUBMIT_MEDICAL_FORM';
export const submitMedicalForm = (values, currentPetId) => ({
    type: SUBMIT_MEDICAL_FORM,
    values,
    currentPetId
});

export const SUBMIT_MEMORY_FORM = 'SUBMIT_MEMORY_FORM';
export const submitMemoryForm = (values, currentPetId) => ({
    type: SUBMIT_MEMORY_FORM,
    values,
    currentPetId
});

export const ADDING_NEW_REMINDER = 'ADDING_NEW_REMINDER';
export const addingNewReminder = (values, currentPetId) => ({
    type: ADDING_NEW_REMINDER,
    values,
    currentPetId
});

export const DELETE_REMINDER = 'DELETE_REMINDER';
export const deleteReminder = (currentPetId, reminderId) => ({
    type: DELETE_REMINDER,
    currentPetId,
    reminderId
});

export const CHANGE_SORTING_PETS_METHOD = 'CHANGE_SORTING_PETS_METHOD';
export const changeSortingPetsMethod = (sortMethod) => ({
    type: CHANGE_SORTING_PETS_METHOD,
    sortMethod
});

export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";
export const toggleNavbar = (bool) =>({
    type: TOGGLE_NAVBAR,
    bool
})

export const CHANGE_CURRENT_PET_ID = 'CHANGE_CURRENT_PET_ID';
export const changeCurrentPetId = (currentPetId) => ({
    type: CHANGE_CURRENT_PET_ID,
    currentPetId
})

export const SHOW_MEDICAL_FORM = "SHOW_MEDICAL_FORM";
export const showMedicalForm = (bool) =>({
    type: SHOW_MEDICAL_FORM,
    bool
})

export const SHOW_MEMORY_FORM = "SHOW_MEMORY_FORM";
export const showMemoryForm = (bool) =>({
    type: SHOW_MEMORY_FORM,
    bool
})

export const CHANGE_SEARCH_TERM = "CHANGE_SEARCH_TERM";
export const changeSearchTerm = (searchTerm) =>({
    type: CHANGE_SEARCH_TERM,
    searchTerm
})

export const CHANGE_CATEGORY_FILTER = "CHANGE_CATEGORY_FILTER";
export const changeCategoryFilter = (categoryFilter) =>({
    type: CHANGE_CATEGORY_FILTER,
    categoryFilter
})

// ASYNC ACTIONS 

export const FETCH_PAWFILES_SUCCESS = 'FETCH_PAWFILES_SUCCESS';
export const fetchPawfilesSuccess = pawfiles => ({
    type: FETCH_PAWFILES_SUCCESS,
    pawfiles
});

export const FETCH_INDIVIDUAL_PAWFILE_SUCCESS = "FETCH_INDIVIDUAL_PAWFILE_SUCCESS";
export const fetchIndividualPawfileSuccess = pawfile => ({
    type: FETCH_INDIVIDUAL_PAWFILE_SUCCESS,
    pawfile
})

export const FETCH_INDIVIDUAL_PAWFILE_REQUEST = "FETCH_INDIVIDUAL_PAWFILE_REQUEST";
export const fetchIndividualPawfileRequest = () => ({
    type: FETCH_INDIVIDUAL_PAWFILE_REQUEST,
})

export const FETCH_INDIVIDUAL_PAWFILE_ERROR = "FETCH_INDIVIDUAL_PAWFILE_ERROR";
export const fetchIndividualPawfileError = () => ({
    type: FETCH_INDIVIDUAL_PAWFILE_ERROR,
})

export const CHANGE_PAWFILES_PENDING = "CHANGE_PAWFILES_PENDING";
export const changePawfilesPending = bool => ({
    type: CHANGE_PAWFILES_PENDING,
    bool
})

export const CHANGE_INDIVIDUAL_PAWFILE_PENDING = "CHANGE_INDIVIDUAL_PAWFILE_PENDING";
export const changeIndividualPawfilePending = bool => ({
    type: CHANGE_INDIVIDUAL_PAWFILE_PENDING,
    bool
})

export const CHANGE_ERROR = "CHANGE_ERROR";
export const changeError = bool => ({
    type: CHANGE_ERROR,
    bool
})

export const fetchPawfiles = () => dispatch => {
    fetch(`${API_BASE_URL}/pawfiles`)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(pawfiles => {
            dispatch(fetchPawfilesSuccess(pawfiles));
        });
};

export const fetchIndividualPawfile = (pawfileId) => dispatch => {
    dispatch(fetchIndividualPawfileRequest());
    fetch(`${API_BASE_URL}/pawfiles/${pawfileId}`)
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(pawfile => {
        console.log('successful fetching of', pawfile);
        dispatch(fetchIndividualPawfileSuccess(pawfile));
    }).catch(err => {
        dispatch(fetchIndividualPawfileError(err));
    });
};

export const SUBMIT_PAWFILE_REQUEST = "SUBMIT_PAWFILE_REQUEST";
export const submitPawfileRequest = () => ({
    type: SUBMIT_PAWFILE_REQUEST,
})

export const SUBMIT_PAWFILE_SUCCESS = "SUBMIT_PAWFILE_SUCCESS";
export const submitPawfileSuccess = (pawfile, currentPetId) => ({
    type: SUBMIT_PAWFILE_SUCCESS,
    pawfile,
    currentPetId
})

export const submitPawfile = (values, currentPetId) => dispatch =>{
    //could be editing a pawfile or submitting it, it's the same form
    const method = currentPetId ? "PUT" : "POST";
    const path = currentPetId ? `${API_BASE_URL}/pawfiles/${currentPetId}` : `${API_BASE_URL}/pawfiles`; 

    console.log('the values being sent are', values)

    dispatch(submitPawfileRequest());
    fetch(path, { 
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values)
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        return res.json();
    }).then(pawfile => {
        console.log('successful creating or updating of', pawfile);
        dispatch(submitPawfileSuccess(pawfile, currentPetId));
    }).catch(err => {
        dispatch(fetchIndividualPawfileError(err));
    });
}

export const DELETE_PAWFILE_SUCCESS = 'DELETE_PAWFILE_SUCCESS';
export const deletePawfileSuccess = (currentPetId) => ({
    type: DELETE_PAWFILE_SUCCESS,
    currentPetId
})

export const DELETE_PAWFILE_REQUEST = "DELETE_PAWFILE_REQUEST";
export const deletePawfileRequest = () => ({
    type: DELETE_PAWFILE_REQUEST,
})

export const deletePawfile = (currentPetId) => dispatch =>{
    dispatch(deletePawfileRequest());
    fetch(`${API_BASE_URL}/pawfiles/${currentPetId}`, { 
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject(res.statusText);
        }
        console.log("HERE");
        console.log('successful deleting');
        dispatch(deletePawfileSuccess(currentPetId));
        // return res.json();
    })
    // .then(() => {
    //     console.log('successful deleting');
        //  dispatch(deletePawfileSuccess(currentPetId));})
    .catch(err => {
        dispatch(fetchIndividualPawfileError(err));
    });
}