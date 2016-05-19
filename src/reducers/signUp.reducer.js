'use strict';

import * as ActionTypes from '../actions';

const defaultState = {};

export default (state = defaultState, action) => {

    switch(action.type) {
        case ActionTypes.ASYNC_START:
            // if(action.subtype === ActionTypes.SIGN_UP_SUBMITTED) console.log(action);
            break;
        case ActionTypes.SIGN_UP_SUBMITTED:
            if(action.error) {
                console.log('ERROR');
            } else {
                const resetForm = {
                    companyName: {
                        value: ''
                    },
                    address: {
                        value: ''
                    }
                };
                state = Object.assign({}, state, resetForm);
            }
            break;
        case ActionTypes.ASYNC_END:
            break;
    }

    return state;
};
