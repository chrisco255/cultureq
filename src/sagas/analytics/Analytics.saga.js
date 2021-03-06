import { put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import * as ActionTypes from '../../reducers/analytics/Analytics.actions';

//fetching of companies
const fetch = (query) => axios.post('/api/graphql', { query })
															.then( response => response.data.data );

export function* fetchAnalytics(action) {
	try {
		const payload = yield call(fetch, action.payload.query);
		yield put( {type: ActionTypes.FETCH_ANALYTICS_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.FETCH_ANALYTICS_FAILED, error} );
	}
}

export function* watchFetchAnalytics() {
	yield* takeEvery(ActionTypes.FETCH_ANALYTICS, fetchAnalytics);
}
