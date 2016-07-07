import * as ActionTypes from '../../pillar/Pillar.actions';

const defaultState = { submitting: false };

export default (state = defaultState, action) => {
    switch(action.type) {
        // case ActionTypes.PILLAR_ADDED:
        //     const submitting = {
        //         _submitting: true
        //     };
        //     state = Object.assign({}, state, submitting);
        //     break;
        case ActionTypes.ADD_PILLAR:
            console.log('SUCCESS! resetting form.');
            const resetForm = {
                _submitting: false,
                name: {
                  value: ''
                },
                content: []
              };
            state = Object.assign({}, state, resetForm);
            break;
        // case ActionTypes.PILLAR_ADD_FAILED:
        //     console.log('ERROR!');
        //
        //     let { errors, errorType } = action.error;
        //
        //     let newState = {
        //       _submitting: false,
        //       _error: errorType
        //     };
        //
        //     let fields = Object.keys(errors);
        //     fields.forEach( field => {
        //       newState[field] = Object.assign({}, state[field], { submitError: errors[field] });
        //     });
        //
        //     state = Object.assign({}, state, newState);
        //     break;

  }

    return state;
};