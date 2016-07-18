import * as ActionTypes from './Analytics.actions';

const defaultState = {
};

export default (state = defaultState, action) => {
	switch(action.type) {
		case ActionTypes.FETCH_ANALYTICS:
			return fetchAnalytics(state, action.payload);
	}

	return state;
};

function fetchAnalytics(state, payload) {
	state = Object.assign({}, state, payload.analytics);
	console.log('GOT THOSE ANALTICS. ✅');
	return state;
}
