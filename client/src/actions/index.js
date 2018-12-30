export const SHOW_PAWFILE_FORM = 'SHOW_PAWFILE_FORM';
export const showPawfileForm = (bool, id) => ({
    type: SHOW_PAWFILE_FORM,
    bool,
    id
});

export const SUBMIT_NEW_PAWFILE = 'SUBMIT_NEW_PAWFILE';
export const submitNewPawfile = (values, id) => ({
    type: SUBMIT_NEW_PAWFILE,
    values,
    id
});

export const SUBMIT_MEDICAL_FORM = 'SUBMIT_MEDICAL_FORM';
export const submitMedicalForm = (values, id) => ({
    type: SUBMIT_MEDICAL_FORM,
    values,
    id
});

export const SUBMIT_MEMORY_FORM = 'SUBMIT_MEMORY_FORM';
export const submitMemoryForm = (values, id) => ({
    type: SUBMIT_MEMORY_FORM,
    values,
    id
});

export const DELETE_PAWFILE = 'DELETE_PAWFILE';
export const deletePawfile = (id) => ({
    type: DELETE_PAWFILE,
    id
})

export const SORTING_ALL_PETS = 'SORTING_ALL_PETS';
export const sortingAllPets = (sortMethod) => ({
    type: SORTING_ALL_PETS,
    sortMethod
});

export const ADDING_NEW_REMINDER = 'ADDING_NEW_REMINDER';
export const addingNewReminder = (values, id) => ({
    type: ADDING_NEW_REMINDER,
    values,
    id
});

export const DELETE_REMINDER = 'DELETE_REMINDER';
export const deleteReminder = (petId, reminderId) => ({
    type: DELETE_REMINDER,
    petId,
    reminderId
});

export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";
export const toggleNavbar = (bool) =>({
    type: TOGGLE_NAVBAR,
    bool
})

export const CHANGE_CURRENT_PET_ID = 'CHANGE_CURRENT_PET_ID';
export const changeCurrentPetId = (id) => ({
    type: CHANGE_CURRENT_PET_ID,
    id
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