import {API_BASE_URL} from '../config';

/* POST & PUT ACTIONS */
export const SUBMIT_REMINDER_REQUEST = "SUBMIT_REMINDER_REQUEST";
export const submitReminderRequest = () => ({
    type: SUBMIT_REMINDER_REQUEST,
})

export const SUBMIT_REMINDER_SUCCESS = "SUBMIT_REMINDER_SUCCESS";
export const submitReminderSuccess = (pawfile, currentPetId) => ({
    type: SUBMIT_REMINDER_SUCCESS,
    pawfile,
    currentPetId
})

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

export const submitReminder = (values, currentPetId) => dispatch =>{

    dispatch(submitReminderRequest());
    fetch(`${API_BASE_URL}/reminders/${currentPetId}`, { 
        method: "POST",
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
        console.log('in actions, got back pawfile:', pawfile);
        dispatch(submitReminderSuccess(pawfile, currentPetId));
    }).catch(err => {
        dispatch(crudError(err));
    });
}
