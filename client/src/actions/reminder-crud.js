import {API_BASE_URL} from '../config';

/* POST & PUT ACTIONS */
export const SUBMIT_REMINDER_REQUEST = "SUBMIT_REMINDER_REQUEST";
export const submitReminderRequest = () => ({
    type: SUBMIT_REMINDER_REQUEST,
})

export const SUBMIT_REMINDER_SUCCESS = "SUBMIT_REMINDER_SUCCESS";
export const submitReminderSuccess = (reminder, currentPetId) => ({
    type: SUBMIT_REMINDER_SUCCESS,
    reminder,
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
    }).then(reminder => {
        console.log('in actions, got back reminder:', reminder);
        dispatch(submitReminderSuccess(reminder, currentPetId));
    }).catch(err => {
        dispatch(crudError(err));
    });
}
