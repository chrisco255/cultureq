import * as ActionTypes from './../../common/auth/Auth.actions.js';

const defaultState = {
	lock: new Auth0Lock('Ty9ofoTxjYJqOlCSnqKhaSDWPurI3DzU', 'ultilabs.auth0.com'),
	idToken: null
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.USER_LOGIN:
			state = Object.assign({}, state, {idToken: action.payload.idToken});
			break;
		case ActionTypes.USER_LOGOUT:
			localStorage.removeItem('userToken');
			state = Object.assign({}, state, { idToken: null });
			break;
	}

	return state;
};
