export const ADDING_NEW_FORM = 'ADDING_NEW_FORM';
export const addingNewForm = (bool) => ({
    type: ADDING_NEW_FORM,
    bool
});

export const ADDING_NEW_PAWFILE = 'ADDING_NEW_PAWFILE';
export const addingNewPawfile = (values) => ({
    type: ADDING_NEW_PAWFILE,
    values
});

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

export const CHANGE_CURRENT_PET_ID = 'CHANGE_CURRENT_PET_ID';
export const changeCurrentPetId = (id) => ({
    type: CHANGE_CURRENT_PET_ID,
    id
});