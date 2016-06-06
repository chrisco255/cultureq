import * as ActionTypes from '../../routes/signup/SignUp.actions';

const defaultState = {
	hasSubmitted: false,
  companyName: '',
  address: ''
};

export default (state = defaultState, action) => {

	switch(action.type) {
		case ActionTypes.SIGN_UP_SUCCEEDED:
			state = Object.assign({}, state, {
        companyName: action.payload.companyName,
        address: action.payload.address,
        hasSubmitted: true
      });
			break;
	}

	return state;
};
