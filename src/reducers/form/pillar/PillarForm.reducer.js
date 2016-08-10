import * as ActionTypes from '../../pillar/Pillar.actions';

const defaultState = {
  submitting: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.PILLAR_CREATE_SUCCEEDED:
      console.log('SUCCESS!✅ Resetting pillar form.');
      return {
        ...state,
        ...{
          _submitting: false,
          name: {
            value: ''
          }
        }
      };
    default:
      return state;
  }
};
