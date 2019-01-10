
import {SubmissionError} from 'redux-form';

import {API_BASE_URL} from '../config'; 
import {normalizeResponseErrors} from './utils';
import {refreshProfileAuthToken} from './auth'

export const UPDATED_USER_SUCCESS = "UPDATED_USER_SUCCESS";
export const updatedUserSuccess = (updatedUser, message) => ({
    type: UPDATED_USER_SUCCESS,
    updatedUser,
    message
})

export const CRUD_ERROR = "CRUD_ERROR";
export const crudError = () => ({
  type: CRUD_ERROR,
})

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => {
        console.log('IN REGISTER USER, ERR IS', err);
        const {reason, message, location} = err;
        if (reason === 'ValidationError') {
            // Convert ValidationErrors into SubmissionErrors for Redux Form
            return Promise.reject(
                new SubmissionError({
                    [location]: message
                })
            );
        }
    });
};

export const updatedUser = user => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/account`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(updatedUser => {
            dispatch(updatedUserSuccess(updatedUser, 'Your account has been successfully updated'));
        })
        .then(()=>{
            dispatch(refreshProfileAuthToken())
        })
        .catch(err => {

            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            }
        });
};

export const updatePassword = user => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/users/password`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(updatedUser => {
            dispatch(updatedUserSuccess(updatedUser, 'Your password has been successfully updated'));
        })
        .catch(err => {
            const {reason, message, location} = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    }) //tells redux form that our submission didnt work
                );
            }
        });
};