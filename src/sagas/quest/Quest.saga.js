import { put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {
  FETCH_CONTENT_POOL,
  FETCH_CONTENT_POOL_SUCCEEDED,
  FETCH_CONTENT_POOL_FAILED
} from '../../reducers/quest/Quest.actions';

//fetching of companies
const fetch = (query) => axios.post('/api/graphql', { query })
	   													.then( response => response.data.data );

export function* fetchContentPool(action) {
	try {
		const payload = yield call(fetch, action.payload.query);
		yield put( {type: FETCH_CONTENT_POOL_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: FETCH_CONTENT_POOL_FAILED, error} );
	}
}

export function* watchFetchContentPool() {
	yield* takeEvery(FETCH_CONTENT_POOL, fetchContentPool);
}
