import * as ActionTypes from './Product.actions';
import * as UserActionTypes from '../user/User.actions';


const defaultState = {
  products: null
    // _id: null,
    // status: null,
    // proposal_id: null,
    // improvements: null
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.FETCH_PRODUCTS_SUCCEEDED:
			state = Object.assign({}, state, {
          products: action.payload.products
        }
      });
			break;
    case UserActionTypes.USER_LOGOUT:
      state = {};
      break;
	}

	return state;
};
