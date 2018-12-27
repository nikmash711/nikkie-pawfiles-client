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

export const TOGGLE_NAVBAR = "TOGGLE_NAVBAR";
export const toggleNavbar = (bool) =>({
    type: TOGGLE_NAVBAR,
    bool
})
