import * as ActionTypes from './User.actions';

const defaultState = {};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.USER_LOGIN:
			return {
				...state,
				...{
					token: action.payload.token,
					profile: action.payload.profile
				}
			};
		case ActionTypes.USER_LOGOUT:
			localStorage.removeItem('userToken');
			localStorage.removeItem('userProfile');
			return {
				...state,
				...{
					token: null,
					profile: null
				}
			};
		default:
			return state;
	}
};
