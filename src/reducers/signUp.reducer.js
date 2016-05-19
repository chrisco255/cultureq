'use strict';

import * as ActionTypes from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {

    switch(action.type) {
        case ActionTypes.ASYNC_START:
            break;
        case ActionTypes.SIGN_UP_SUCCEEDED:
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
        case ActionTypes.SIGN_UP_FAILED:
            console.log('ERROR! resetting form.');
            console.log(action);
            break;

        case ActionTypes.ASYNC_END:
            break;
    }

    return state;
};
