import user from './user/User.reducer.js';
import companyForm from './form/company/CompanyForm.reducer';
import pillarForm from './form/pillar/PillarForm.reducer';
import company from './company/Company.reducer';
import pillar from './pillar/Pillar.reducer';
import socket from './socket/Socket.reducer';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/*
	NOTE: The hierarchy of the reducers folder should reflect the structure of the reducers object below
 */
const reducers = {
	user,
	routing,
	company,
	socket,
	pillar,
	form: formReducer.plugin({
		company: companyForm,
		pillar: pillarForm
	})
};

export default combineReducers(reducers);
