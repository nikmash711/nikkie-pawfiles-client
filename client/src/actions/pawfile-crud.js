import {API_BASE_URL} from '../config';

/* GENERAL */
export const CHANGE_PAWFILES_PENDING = "CHANGE_PAWFILES_PENDING";
export const changePawfilesPending = bool => ({
    type: CHANGE_PAWFILES_PENDING,
    bool
})

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


export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

export const fetchPawfiles = () => dispatch => {
    dispatch(fetchPawfilesRequest());
    fetch(`${API_BASE_URL}/pawfiles`)
        .then(res => {
            if (!res.ok) {
                return Promise.reject(res.statusText);
            }
            return res.json();
        })
        .then(pawfiles => {
            dispatch(fetchPawfilesSuccess(pawfiles));
        })
        .catch(err => {
            dispatch(crudError());
        });
};

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

export const submitPawfile = (values, currentPetId) => dispatch =>{
    //could be editing a pawfile or submitting it, it's the same form
    const method = currentPetId ? "PUT" : "POST";
    const path = currentPetId ? `${API_BASE_URL}/pawfiles/${currentPetId}` : `${API_BASE_URL}/pawfiles`; 

    dispatch(submitPawfileRequest());
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
    }).then(pawfile => {
        dispatch(submitPawfileSuccess(pawfile, currentPetId));
    }).catch(err => {
        dispatch(crudError());
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

export const deletePawfile = (currentPetId) => dispatch =>{
  dispatch(deletePawfileRequest());
  fetch(`${API_BASE_URL}/pawfiles/${currentPetId}`, { 
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
      console.log("HERE");
      console.log('successful deleting');
      dispatch(deletePawfileSuccess(currentPetId));
  })
  .catch(err => {
      dispatch(crudError());
  });
}