import * as ActionTypes from './Company.actions';
import * as UserActionTypes from '../user/User.actions';

const defaultState = {
  name: null,
  address: null,
  contactEmail: null
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.COMPANY_SUBMIT_SUCCEEDED:
			state = Object.assign({}, state, {
        name: action.payload.name,
        address: action.payload.address,
        contactEmail: action.payload.contactEmail
      });
			break;
    case UserActionTypes.USER_LOGOUT:
      state = {};
      break;
	}

	return state;
};
