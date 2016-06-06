import auth from './auth/Auth.reducer.js';
import signUpForm from './form/signup/SignUpForm.reducer.js';
import signup from './signup/SignUp.reducer.js';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/*
	NOTE: The hierarchy of the reducers folder should reflect the structure of the reducers object below
 */
const reducers = {
	auth,
	routing,
	signup,
	form: formReducer.plugin({
		signup: signUpForm
	})
};

export default combineReducers(reducers);
