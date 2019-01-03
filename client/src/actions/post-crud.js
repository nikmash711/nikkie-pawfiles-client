import {API_BASE_URL} from '../config';

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

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

export const submitPost = (values, currentPetId, postId) => dispatch =>{
    //could be editing a post or submitting a new one, it's the same form
    const method = postId ? "PUT" : "POST";
    const path = postId ? `${API_BASE_URL}/posts/${currentPetId}/${postId}` : `${API_BASE_URL}/posts/${currentPetId}`; 
    dispatch(submitPostRequest());
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
    }).then(post => {
        console.log('in actions, got back post:', post);
        dispatch(submitPostSuccess(post, currentPetId, postId));
    }).catch(err => {
        dispatch(crudError(err));
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

export const deletePost = (currentPetId, postId) => dispatch =>{
    dispatch(deletePostRequest());
    fetch(`${API_BASE_URL}/posts/${currentPetId}/${postId}`, { 
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
        dispatch(deletePostSuccess(currentPetId, postId));
    })
    .catch(err => {
        dispatch(crudError(err));
    });
  }