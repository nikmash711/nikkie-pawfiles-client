import {API_BASE_URL} from '../config';

export const SHOW_PAWFILE_FORM = 'SHOW_PAWFILE_FORM';
export const showPawfileForm = (bool, currentPetId) => ({
    type: SHOW_PAWFILE_FORM,
    bool,
    currentPetId
});

export const SUBMIT_PAWFILE = 'SUBMIT_PAWFILE';
export const submitPawfile = (values, currentPetId) => ({
    type: SUBMIT_PAWFILE,
    values,
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

export const DELETE_PAWFILE = 'DELETE_PAWFILE';
export const deletePawfile = (currentPetId) => ({
    type: DELETE_PAWFILE,
    currentPetId
})

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

export const CHANGE_PENDING = "CHANGE_PENDING";
export const changePending = bool => ({
    type: CHANGE_PENDING,
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
    fetch(`${API_BASE_URL}/${pawfileId}`)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(pawfile => {
            dispatch(fetchIndividualPawfileSuccess(pawfile));
        });
};