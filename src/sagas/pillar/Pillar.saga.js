import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import axios from 'axios';
import { push } from 'react-router-redux';
import * as ActionTypes from '../../reducers/pillar/Pillar.actions';

// Fetch
const fetch = (query) => {
	return axios.post(`/api/graphql`, { query })
							.then( response =>  response.data.data );
}

export function* fetchPillars(action) {
	try {
		const payload = yield call(fetch, action.payload.query);
		yield put( {type: ActionTypes.FETCH_PILLARS_SUCCEEDED, payload} );
	} catch (error) {
		yield put( {type: ActionTypes.FETCH_PILLARS_FAILED, error} );
	}
}
export function* watchFetchPillarsSubmitted() {
	yield* takeEvery(ActionTypes.FETCH_PILLARS_SUBMITTED, fetchPillars);
}

export function* pillarCreate(action) {
	try {
		const { name, isDeleted, tenantId } = action.payload.pillar;
		const createResponse = yield call(fetch,  `
			mutation {
			  mutation: PILLAR_CREATE(
			    name: "${name}"
			    isDeleted: ${isDeleted}
					tenantId: "${tenantId}"
			  ) {
			    _id
					name
					isDeleted
					tenantId
			  }
			}
		`);
		const payload = createResponse.mutation;
		yield put( {type: ActionTypes.PILLAR_CREATE_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.PILLAR_CREATE_FAILED, error} );
	}
}
export function* watchPillarCreateSubmitted() {
	yield* takeEvery(ActionTypes.PILLAR_CREATE_SUBMITTED, pillarCreate);
}

export function* pillarDelete(action) {
	try {
		const { _id, name, isDeleted, tenantId } = action.payload.pillar;
		const deleteResponse = yield call(fetch,  `
			mutation {
			  mutation: PILLAR_DELETE(
					_id: "${_id}"
			    name: "${name}"
			    isDeleted: ${isDeleted}
					tenantId: "${tenantId}"
			  ) {
			    _id
					name
					isDeleted
					tenantId
			  }
			}
		`);
		const payload = deleteResponse.mutation;
		yield put( {type: ActionTypes.PILLAR_DELETE_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.PILLAR_DELETE_FAILED, error} );
	}
}
export function* watchPillarDeleteSubmitted() {
	yield* takeEvery(ActionTypes.PILLAR_DELETE_SUBMITTED, pillarDelete);
}

export function* pillarNameChange(action) {
	try {
		const { pillarName, index } = action.payload;
		const nameChangeResponse = yield call(fetch,  `
			mutation {
			  mutation: PILLAR_NAME_CHANGE(
			    name: "${pillarName}"
			    index: ${index}
			  ) {
					_id
					name
					isDeleted
					tenantId
			  }
			}
		`);
		const payload = nameChangeResponse.mutation;
		yield put( {type: ActionTypes.PILLAR_NAME_CHANGE_SUCCEEDED, payload} );
	} catch (error) {
		yield put( {type: ActionTypes.PILLAR_NAME_CHANGE_FAILED, error} );
	}
}
export function* watchPillarNameChangeSubmitted() {
	yield* takeEvery(ActionTypes.PILLAR_NAME_CHANGE_SUBMITTED, pillarNameChange);
}
