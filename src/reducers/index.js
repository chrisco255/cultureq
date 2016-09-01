import user from './user/User.reducer.js';
import companyForm from './form/company/CompanyForm.reducer';
import pillarForm from './form/pillar/PillarForm.reducer';
import videoForm from './form/video/VideoForm.reducer';
import quoteForm from './form/quote/QuoteForm.reducer';
import company from './company/Company.reducer';
import pillar from './pillar/Pillar.reducer';
import content from './content/Content.reducer';
import quest from './quest/Quest.reducer';
import survey from './survey/Survey.reducer';
import socket from './socket/Socket.reducer';
import analytics from './analytics/Analytics.reducer';

import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/*
	NOTE: The hierarchy of the reducers folder should reflect the structure of the reducers object below
*/
const reducers = {
	user,
	analytics,
	routing,
	company,
	socket,
	pillar,
	content,
	quest,
	survey,
	form: formReducer.plugin({
		company: companyForm,
		pillar: pillarForm,
		quote: quoteForm,
		video: videoForm
	})
};

export default combineReducers(reducers);
