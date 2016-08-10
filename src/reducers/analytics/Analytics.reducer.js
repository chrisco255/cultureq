import * as ActionTypes from './Analytics.actions';

const defaultState = {};

export default (state = defaultState, action) => {
	switch(action.type) {
		case ActionTypes.FETCH_ANALYTICS:
			// console.log('FETCH_ANALYTICS is happening...');
			return state;
		case ActionTypes.FETCH_ANALYTICS_SUCCEEDED:
			return {
				...state,
				...action.payload.analytics,
			};
		case ActionTypes.FETCH_ANALYTICS_FAILED:
			console.log('FETCH_ANALYTICS_FAILED ❌');
			return state;
		default:
			return state;
	}
};
