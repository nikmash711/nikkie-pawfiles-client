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
export const showMedicalForm = (bool, currentPostId) =>({
    type: SHOW_MEDICAL_FORM,
    bool,
    currentPostId
})

export const SHOW_MEMORY_FORM = "SHOW_MEMORY_FORM";
export const showMemoryForm = (bool, currentPostId) =>({
    type: SHOW_MEMORY_FORM,
    bool,
    currentPostId
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





