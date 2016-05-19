'use strict';
import auth from './auth.reducer.js';
import common from './common.reducer.js';
import signUp from './signUp.reducer.js';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

const reducers = {
	auth,
	common,
	routing,
	form: formReducer.plugin({
		signup: signUp
	})
};

export default combineReducers(reducers);
