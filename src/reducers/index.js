import auth from './auth/Auth.reducer.js';
import signUp from './form/signup/SignUp.reducer.js';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/*
	NOTE: The hierarchy of the reducers folder should reflect the structure of the reducers object below
 */
const reducers = {
	auth,
	routing,
	form: formReducer.plugin({
		signup: signUp
	})
};

export default combineReducers(reducers);
