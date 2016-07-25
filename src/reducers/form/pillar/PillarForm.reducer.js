import * as ActionTypes from '../../pillar/Pillar.actions';

const defaultState = {
    submitting: false
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case ActionTypes.PILLAR_CREATE_SUCCEEDED:
            console.log('SUCCESS!✅ Resetting pillar form.');
            const resetForm = {
                _submitting: false,
                name: {
                    value: ''
                }
            };
            state = Object.assign({}, state, resetForm);
            break;
    }

    return state;
};
