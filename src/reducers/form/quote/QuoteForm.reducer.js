import * as ActionTypes from '../../content/Content.actions';

const defaultState = {
  submitting: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case ActionTypes.CONTENT_CREATE_SUCCEEDED:
      console.log('SUCCESS!✅ Resetting quote form.');
      return {
        ...state,
        ...{
          _submitting: false,
          pillarId: {
            value: ''
          },
          data: {
            quote: {
              value: ''
            },
            author: {
              value: ''
            }
          }
        }
      };
    default:
      return state;
  }
};
