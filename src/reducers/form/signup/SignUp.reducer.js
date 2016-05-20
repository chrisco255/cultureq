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
            console.log('ERROR! resetting form.');
            console.log(action);
            break;
    }

    return state;
};
