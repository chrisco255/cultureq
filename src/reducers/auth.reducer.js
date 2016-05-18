'use strict';

const defaultState = {
	lock: new Auth0Lock('Ty9ofoTxjYJqOlCSnqKhaSDWPurI3DzU', 'ultilabs.auth0.com'),
	idToken: null
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case 'LOGIN':
			state = Object.assign({}, state, {idToken: action.payload.idToken});
			break;
		case 'LOG_OUT':
			localStorage.removeItem('userToken');
			state = Object.assign({}, state, { idToken: null });
			break;
	}

	return state;
};
