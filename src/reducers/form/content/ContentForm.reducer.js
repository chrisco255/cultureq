import * as ActionTypes from '../../content/Content.actions';

const defaultState = {
    submitting: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.CONTENT_CREATE_SUCCEEDED:
            console.log('SUCCESS!✅ Resetting content form.');
            const resetForm = {
                _submitting: false,
                pillarId: {
                  value: ''
                },
                type: {
                  value: ''
                },
                data: {
                  title: {
                    value: ''
                  },
                  description: {
                    value: ''
                  },
                  url: {
                    value: ''
                  },
                  quote: {
                    value: ''
                  },
                  author: {
                    value: ''
                  },
                  recipient: {
                    value: ''
                  },
                  recipientPosition: {
                    value: ''
                  }
                }
            };
            state = Object.assign({}, state, resetForm);
            break;
    }

    return state;
};
