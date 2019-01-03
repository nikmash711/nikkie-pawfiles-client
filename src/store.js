import {createStore, combineReducers, applyMiddleware} from 'redux';
import {reducer as formReducer} from 'redux-form';
import {pawfileReducer} from './reducers/pawfile-reducer'
import thunk from 'redux-thunk';

export default createStore(
  combineReducers({
    form: formReducer,
    pawfile: pawfileReducer,
  }),
  applyMiddleware(thunk)
);