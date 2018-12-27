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

// export const EDITING_PAWFILE_FORM = 'EDITING_PAWFILE_FORM';
// export const editingPawfileForm = (id) => ({
//     type: EDITING_PAWFILE_FORM,
//     id
// });


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

// export const CHANGE_CURRENT_PET_ID = 'CHANGE_CURRENT_PET_ID';
// export const changeCurrentPetId = (id) => ({
//     type: CHANGE_CURRENT_PET_ID,
//     id
// });

// export const EDITING_PAWFILE = 'EDITING_PAWFILE';
// export const editingPawfile = (values,id) => ({
//     type: EDITING_PAWFILE,
//     values,
//     id,
// });