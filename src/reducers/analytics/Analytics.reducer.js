import * as ActionTypes from './Analytics.actions';

const defaultState = {
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case ActionTypes.FETCH_ANALYTICS:
			console.log('FETCH_ANALYTICS is happening...');
		case ActionTypes.FETCH_ANALYTICS_SUCCEEDED:
			return fetchAnalytics(state, action.payload);
		case ActionTypes.FETCH_ANALYTICS_FAILED:
			console.log('FETCH_ANALYTICS_FAILED ❌');
			break;
	}

	return state;
};

function fetchAnalytics(state, payload) {
	state = Object.assign({}, state, payload.analytics);
	console.log('GOT THOSE ANALTICS. ✅');
	return state;
}
