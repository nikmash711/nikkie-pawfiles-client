import {API_BASE_URL} from '../config';

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

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

export const submitReminder = (values, currentPetId, reminderId) => dispatch =>{
    const method = reminderId ? "PUT" : "POST";
    const path = reminderId ? `${API_BASE_URL}/reminders/${currentPetId}/${reminderId}` : `${API_BASE_URL}/reminders/${currentPetId}`; 

    dispatch(submitReminderRequest());
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
    }).then(reminder => {
        console.log('in actions, got back pawfile:', reminder);
        dispatch(submitReminderSuccess(reminder, currentPetId, reminderId));
    }).catch(err => {
        dispatch(crudError(err));
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

export const deleteReminder = (currentPetId, reminderId) => dispatch =>{
    console.log('in delete reminder action, deleting reminder with id', reminderId, 'in pet with id', currentPetId);
    dispatch(deleteReminderRequest());
    fetch(`${API_BASE_URL}/reminders/${currentPetId}/${reminderId}`, { 
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
        console.log('successful deleting');
        dispatch(deleteReminderSuccess(currentPetId, reminderId));
    })
    .catch(err => {
        dispatch(crudError(err));
    });
  }