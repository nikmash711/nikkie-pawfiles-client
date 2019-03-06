import {API_BASE_URL} from '../config';
import {crudError} from './index'
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';

/* POST & PUT ACTIONS */
export const SUBMIT_POST_REQUEST = "SUBMIT_POST_REQUEST";
export const submitPostRequest = () => ({
    type: SUBMIT_POST_REQUEST,
})

export const SUBMIT_POST_SUCCESS = "SUBMIT_POST_SUCCESS";
export const submitPostSuccess = (post, currentPetId, postId) => ({
    type: SUBMIT_POST_SUCCESS,
    post,
    currentPetId,
    postId
})

export const submitPost = (values, currentPetId, postId) => (dispatch, getState) =>{
    let formData = new FormData();
    
    Object.keys(values).forEach(item=> {
        if(values[item].length>0){
            formData.append(item, (values[item]))
        }
    });

    const method = postId ? "PUT" : "POST";
    const path = postId ? `${API_BASE_URL}/posts/${currentPetId}/${postId}` : `${API_BASE_URL}/posts/${currentPetId}`; 
    dispatch(submitPostRequest());
    const authToken = getState().auth.authToken;

    return fetch(path, { 
        method: method,
        headers: {
            Authorization: `Bearer ${authToken}`
        },
        body: formData,
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(post => {
        dispatch(submitPostSuccess(post, currentPetId, postId));
    }).catch(err => {
        dispatch(crudError("An error has occured. Please try refreshing!"));
        const {message, location, status} = err;
        if (status === 400) {
            // Convert errors into SubmissionErrors for Redux Form
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
        else{
            return Promise.reject(
                new SubmissionError({
                    _error: 'Unable to create post, please try again',
                })
            );
        }
    });
}

/* DELETE POST */
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const deletePostSuccess = (currentPetId, postId) => ({
    type: DELETE_POST_SUCCESS,
    currentPetId,
    postId
});

export const DELETE_POST_REQUEST = "DELETE_POST_REQUEST";
export const deletePostRequest = () => ({
    type: DELETE_POST_REQUEST,
})

export const deletePost = (currentPetId, postId) => (dispatch, getState) =>{
    dispatch(deletePostRequest());
    const authToken = getState().auth.authToken;
    fetch(`${API_BASE_URL}/posts/${currentPetId}/${postId}`, { 
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
        dispatch(deletePostSuccess(currentPetId, postId));
    })
    .catch(err => {
        dispatch(crudError("An error has occured. Please try refreshing!"));
    });
  }