import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {crudError} from './index'


/* POST & PUT ACTIONS */
export const SUBMIT_REMINDER_REQUEST = "SUBMIT_REMINDER_REQUEST";
export const submitReminderRequest = () => ({
    type: SUBMIT_REMINDER_REQUEST,
})

export const SUBMIT_REMINDER_SUCCESS = "SUBMIT_REMINDER_SUCCESS";
export const submitReminderSuccess = (reminder, currentPetId, reminderId) => ({
    type: SUBMIT_REMINDER_SUCCESS,
    reminder,
    currentPetId,
    reminderId
})

export const submitReminder = (values, currentPetId, reminderId) => (dispatch, getState) =>{
    const method = reminderId ? "PUT" : "POST";
    const path = reminderId ? `${API_BASE_URL}/reminders/${currentPetId}/${reminderId}` : `${API_BASE_URL}/reminders/${currentPetId}`; 

    dispatch(submitReminderRequest());
    const authToken = getState().auth.authToken;
    fetch(path, { 
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(values)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(reminder => {
        console.log('in actions, got back pawfile:', reminder);
        dispatch(submitReminderSuccess(reminder, currentPetId, reminderId));
    }).catch(err => {
        dispatch(crudError("An error has occured. Please try refreshing!"));
    });
}

/* DELETE */
export const DELETE_REMINDER_SUCCESS = 'DELETE_REMINDER_SUCCESS';
export const deleteReminderSuccess = (currentPetId, reminderId) => ({
    type: DELETE_REMINDER_SUCCESS,
    currentPetId,
    reminderId
});

export const DELETE_REMINDER_REQUEST = "DELETE_REMINDER_REQUEST";
export const deleteReminderRequest = () => ({
    type: DELETE_REMINDER_REQUEST,
})

export const deleteReminder = (currentPetId, reminderId) => (dispatch, getState) =>{
    console.log('in delete reminder action, deleting reminder with id', reminderId, 'in pet with id', currentPetId);
    dispatch(deleteReminderRequest());
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/reminders/${currentPetId}/${reminderId}`, { 
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        console.log('successful deleting');
        dispatch(deleteReminderSuccess(currentPetId, reminderId));
    })
    .catch(err => {
        dispatch(crudError("An error has occured. Please try refreshing!"));
    });
  }