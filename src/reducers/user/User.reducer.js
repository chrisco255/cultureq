import * as ActionTypes from './User.actions';

const defaultState = {};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.USER_LOGIN:
			state = Object.assign({}, state, {
				token: action.payload.token,
				profile: action.payload.profile
			});
			break;
		case ActionTypes.USER_LOGOUT:
			localStorage.removeItem('userToken');
			localStorage.removeItem('userProfile');
			state = Object.assign({}, state, { token: null, profile: null });
			break;
	}

	return state;
};
