'use strict';
import { SIGN_UP_SUCCEEDED, SIGN_UP_FAILED } from '../../../routes/signup/SignUp.actions';

const defaultState = {};

export default (state = defaultState, action) => {
    switch(action.type) {
        case SIGN_UP_SUCCEEDED:
            console.log('SUCCESS! resetting form.');
            console.log(action.payload);
            const resetForm = {
                companyName: {
                    value: ''
                },
                address: {
                    value: ''
                }
            };
            state = Object.assign({}, state, resetForm);
            break;
        case SIGN_UP_FAILED:
            console.log('ERROR!');

            let { errors, errorType } = action.error; // TODO: DEMOOOOOOOOOOOOOOOOOOOOOOO remove error from action.error

            let newState = {
              _error: errorType
            };

            let fields = Object.keys(errors);
            fields.forEach( field => {
              newState[field] = Object.assign({}, state[field], { submitError: errors[field] });
            });

            state = Object.assign({}, state, newState);
            break;
    }

    return state;
};
