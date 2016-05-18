'use strict';
import auth from './auth.reducer.js';
import common from './auth.reducer.js';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
	auth,
	common,
	form: formReducer
};

export default combineReducers(reducers);