import * as ActionTypes from './Company.actions';
import * as UserActionTypes from '../user/User.actions';

// const defaultState = {
//   _id: null,
//   name: null,
//   address: null,
//   // peepCSV: null,
//   contact: {
//     name: null,
//     email: null,
//     phone: null
//   }
// };
const defaultState = [];

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.COMPANY_SUBMIT_SUCCEEDED:
      // state = Object.assign({}, state, {
      //   _id: action.payload._id,
      //   name: action.payload.name,
      //   address: action.payload.address,
      //   // peepCSV: action.payload.peepCSV,
      //   contact: {
      //     name: action.payload.contact.name,
      //     email: action.payload.contact.email,
      //     phone: action.payload.contact.phone
      //   }
      // });
      return {
        _id: action.payload._id,
        name: action.payload.name,
        address: action.payload.address,
        // peepCSV: action.payload.peepCSV,
        contact: {
          name: action.payload.contact.name,
          email: action.payload.contact.email,
          phone: action.payload.contact.phone
        }
      };
    case ActionTypes.FETCH_COMPANIES_SUCCEEDED:
			// TODO: THIS IS SUPA BROKEN
			return state;
      //state = action.payload.tenants;
      //console.log("New state - ", state);
    case UserActionTypes.USER_LOGOUT:
      return {};
		default:
			return state;
	}
};
