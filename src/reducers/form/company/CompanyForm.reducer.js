import * as ActionTypes from '../../company/Company.actions';

const defaultState = { submitting: false };

export default (state = defaultState, action) => {
    switch(action.type) {
        case ActionTypes.COMPANY_SUBMITTED:
            return {
              ...state,
              ...{
                _submitting: true
              }
            };
        case ActionTypes.COMPANY_SUBMIT_SUCCEEDED:
            console.log('SUCCESS! resetting form.');
            return {
              ...state,
              ...{
                  _submitting: false,
                  name: {
                      value: ''
                  },
                  address: {
                      value: ''
                  },
                  // peepCSV: {},
                  contact: {
                    name: {
                      value: ''
                    },
                    email: {
                      value: ''
                    },
                    phone: {
                      value: ''
                    }
                  }
              }
            };
        case ActionTypes.COMPANY_SUBMIT_FAILED:
            console.log('ERROR!');

            // let fields = Object.keys(errors);
            // fields.forEach( field => {
            //   newState[field] = Object.assign({}, state[field], { submitError: errors[field] });
            // });

            return {
              ...state,
              ...{
                _submitting: false,
                _error: action.error.errorType
              }
            };

        default:
          return state;
    }
};
