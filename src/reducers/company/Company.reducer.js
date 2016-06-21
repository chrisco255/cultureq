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
      const newTenant = {
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
      state = [...state, newTenant];
			break;
    case ActionTypes.FETCH_COMPANIES_SUCCEEDED:
      state = action.payload.tenants;
      console.log("New state - ", state);

      break;
    case UserActionTypes.USER_LOGOUT:
      state = {};
      break;
	}

	return state;
}
