import {API_BASE_URL} from '../config';
import {crudError} from './index'
import {normalizeResponseErrors} from './utils';

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
    //could be editing a post or submitting a new one, it's the same form
    const method = postId ? "PUT" : "POST";
    const path = postId ? `${API_BASE_URL}/posts/${currentPetId}/${postId}` : `${API_BASE_URL}/posts/${currentPetId}`; 
    dispatch(submitPostRequest());
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
    .then(post => {
        console.log('in actions, got back post:', post);
        dispatch(submitPostSuccess(post, currentPetId, postId));
    }).catch(err => {
        dispatch(crudError("An error has occured. Please try again soon!"));
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
        console.log('successful deleting');
        dispatch(deletePostSuccess(currentPetId, postId));
    })
    .catch(err => {
        dispatch(crudError("An error has occured. Please try again soon!"));
    });
  }