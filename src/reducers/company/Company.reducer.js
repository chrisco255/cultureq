import * as ActionTypes from './Company.actions';
import * as UserActionTypes from '../user/User.actions';

const defaultState = {
  name: null,
  address: null,
  peepCSV: null,
  contact: {
    name: null,
    email: null,
    phone: null
  }
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.COMPANY_SUBMIT_SUCCEEDED:
			state = Object.assign({}, state, {
        name: action.payload.name,
        address: action.payload.address,
        peepCSV: action.payload.peepCSV,
        contact: {
          name: action.payload.contact.name,
          email: action.payload.contact.email,
          phone: action.payload.contact.phone
        }
      });
			break;
    case UserActionTypes.USER_LOGOUT:
      state = {};
      break;
	}

	return state;
};
