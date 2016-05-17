'use strict';

export default (state, action) => {

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
