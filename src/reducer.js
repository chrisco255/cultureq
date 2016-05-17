'use strict';

import auth from './reducers/auth.reducer';
import common from './reducers/auth.reducer';

const defaultState = {
	appName: 'Culture Shock',
	lock: new Auth0Lock('Ty9ofoTxjYJqOlCSnqKhaSDWPurI3DzU', 'ultilabs.auth0.com'),
	idToken: null
};

export default (state = defaultState, action) => {
    state = auth(state, action);
    state = common(state, action);
    
	return state;
};