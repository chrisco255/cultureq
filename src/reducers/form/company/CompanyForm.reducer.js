import * as ActionTypes from '../../company/Company.actions';

const defaultState = { submitting: false };

export default (state = defaultState, action) => {
    switch(action.type) {
        case ActionTypes.COMPANY_SUBMITTED:
            const submitting = {
                _submitting: true
            };
            state = Object.assign({}, state, submitting);
            break;
        case ActionTypes.COMPANY_SUBMIT_SUCCEEDED:
            console.log('SUCCESS! resetting form.');
            const resetForm = {
                _submitting: false,
                name: {
                    value: ''
                },
                address: {
                    value: ''
                },
                contact: {
                  cname: {
                    value: ''
                  },
                  email: {
                    value: ''
                  },
                  phone: {
                    value: ''
                  }
                }
            };
            state = Object.assign({}, state, resetForm);
            break;
        case ActionTypes.COMPANY_SUBMIT_FAILED:
            console.log('ERROR!');

            let { errors, errorType } = action.error;

            let newState = {
              _submitting: false,
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
