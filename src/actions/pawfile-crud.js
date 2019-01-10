import {API_BASE_URL} from '../config';
import {crudError} from './index'
import {normalizeResponseErrors} from './utils';

/* GENERAL */

export const CHANGE_ERROR = "CHANGE_ERROR";
export const changeError = bool => ({
    type: CHANGE_ERROR,
    bool
})

/* GET ACTIONS */

export const FETCH_PAWFILES_SUCCESS = 'FETCH_PAWFILES_SUCCESS';
export const fetchPawfilesSuccess = pawfiles => ({
    type: FETCH_PAWFILES_SUCCESS,
    pawfiles
});

export const FETCH_PAWFILES_REQUEST = "FETCH_PAWFILES_REQUEST";
export const fetchPawfilesRequest = () => ({
    type: FETCH_PAWFILES_REQUEST,
})


export const fetchPawfiles = () => (dispatch, getState) => {
    dispatch(fetchPawfilesRequest());
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/pawfiles`, {
        method: 'GET',
        headers: {
            // Provide our auth token as credentials
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(pawfiles => {
            dispatch(fetchPawfilesSuccess(pawfiles));
        })
        .catch(err => {
            dispatch(crudError("An error has occured. Please try again soon!"));
        });
};

//how can i implement something like this for mine 
// export function search(name) {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => resolve(_search(name)), 500);
//     });
// }

/* POST & PUT ACTIONS */
export const SUBMIT_PAWFILE_REQUEST = "SUBMIT_PAWFILE_REQUEST";
export const submitPawfileRequest = () => ({
    type: SUBMIT_PAWFILE_REQUEST,
})

export const SUBMIT_PAWFILE_SUCCESS = "SUBMIT_PAWFILE_SUCCESS";
export const submitPawfileSuccess = (pawfile, currentPetId) => ({
    type: SUBMIT_PAWFILE_SUCCESS,
    pawfile,
    currentPetId
})

export const submitPawfile = (values, currentPetId) => (dispatch, getState) =>{
    //could be editing a pawfile or submitting it, it's the same form
    const method = currentPetId ? "PUT" : "POST";
    const path = currentPetId ? `${API_BASE_URL}/pawfiles/${currentPetId}` : `${API_BASE_URL}/pawfiles`; 

    dispatch(submitPawfileRequest());
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
    .then(pawfile => {
        dispatch(submitPawfileSuccess(pawfile, currentPetId));
    }).catch(err => {
        dispatch(crudError("An error has occured. Please try again soon!"));
    });
}


/* DELETE ACTIONS */
export const DELETE_PAWFILE_SUCCESS = 'DELETE_PAWFILE_SUCCESS';
export const deletePawfileSuccess = (currentPetId) => ({
    type: DELETE_PAWFILE_SUCCESS,
    currentPetId
})

export const DELETE_PAWFILE_REQUEST = "DELETE_PAWFILE_REQUEST";
export const deletePawfileRequest = () => ({
    type: DELETE_PAWFILE_REQUEST,
})

export const deletePawfile = (currentPetId) => (dispatch, getState) =>{
  dispatch(deletePawfileRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/pawfiles/${currentPetId}`, { 
      method: "DELETE",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
      }
  })
  .then(res => normalizeResponseErrors(res))
  .then(() => {
      console.log("HERE");
      console.log('successful deleting');
      dispatch(deletePawfileSuccess(currentPetId));
  })
  .catch(err => {
    dispatch(crudError("An error has occured. Please try again soon!"));
});
}