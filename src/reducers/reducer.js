'use strict';
import auth from './auth.reducer.js';
import common from './common.reducer.js';
import signUp from './sign_up.reducer.js';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
	auth,
	common,
	form: formReducer.plugin({
		signup: signUp
	})
};

export default combineReducers(reducers);