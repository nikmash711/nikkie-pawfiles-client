import {API_BASE_URL} from '../config';

/* POST & PUT ACTIONS */
export const SUBMIT_POST_REQUEST = "SUBMIT_POST_REQUEST";
export const submitPostRequest = () => ({
    type: SUBMIT_POST_REQUEST,
})

export const SUBMIT_POST_SUCCESS = "SUBMIT_POST_SUCCESS";
export const submitPostSuccess = (pawfile, currentPetId) => ({
    type: SUBMIT_POST_SUCCESS,
    pawfile,
    currentPetId
})

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

export const submitPost = (values, currentPetId) => dispatch =>{
    dispatch(submitPostRequest());
    fetch(`${API_BASE_URL}/posts/${currentPetId}`, { 
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
        dispatch(submitPostSuccess(pawfile, currentPetId));
    }).catch(err => {
        dispatch(crudError(err));
    });
}