'use strict';

import { reset } from 'redux-form';


const defaultState = {};

export default (state = defaultState, action) => {

    switch(action.type) {
        case 'ASYNC_START':
            // if(action.subtype === 'SIGN_UP_SUBMITTED') console.log(action);
            break;
        case 'SIGN_UP_SUBMITTED':
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
        case 'ASYNC_END':
            break;
    }

    return state;
};
