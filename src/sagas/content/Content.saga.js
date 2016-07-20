import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';
import { push } from 'react-router-redux';
import * as ActionTypes from '../../reducers/content/Content.actions';

const post = (body) => {
	console.log("Posting content body - ", body);
	return axios.post('/api/content', body).then( response => response.data );
}

// Fetch
const fetch = (query) => {
	return axios.post(`/api/graphql`, { query })
							.then( response =>  response.data.data );
}

export function* fetchContents(action) {
	try {
		const payload = yield call(fetch, action.payload.query);
		yield put( {type: ActionTypes.FETCH_CONTENTS_SUCCEEDED, payload} );
	} catch (error) {
		yield put( {type: ActionTypes.FETCH_CONTENTS_FAILED, error } );
	}
}
export function* watchFetchContentsSubmitted() {
	yield* takeEvery(ActionTypes.FETCH_CONTENTS_SUBMITTED, fetchContents);
}

export function* contentCreate(action) {
	try {
		console.log('in saga');
		const payload = yield call(post, {
			type: 'command.CONTENT_CREATE',
			payload: action.payload.content
		});
		console.log('received payload from call - ', payload);
		yield put( {type: ActionTypes.CONTENT_CREATE_SUCCEEDED, payload } );
	} catch (error) {
		console.log('ERROR 😡', error);
		yield put( {type: ActionTypes.CONTENT_CREATE_FAILED, error} );
	}
}
export function* watchContentCreateSubmitted() {
	yield* takeEvery(ActionTypes.CONTENT_CREATE_SUBMITTED, contentCreate);
}
