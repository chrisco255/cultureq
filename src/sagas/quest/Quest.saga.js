import { put, call } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import axios from 'axios';
import {
  FETCH_CONTENT_POOL,
  FETCH_CONTENT_POOL_SUCCEEDED,
  FETCH_CONTENT_POOL_FAILED,

  CONTENT_ADD_SUBMITTED,
  CONTENT_ADD_SUCCEEDED,
  CONTENT_ADD_FAILED,

  CONTENT_REMOVE_SUBMITTED,
  CONTENT_REMOVE_SUCCEEDED,
  CONTENT_REMOVE_FAILED,

  COMMIT_DRAG_MOVE_SUBMITTED,
  COMMIT_DRAG_MOVE_SUCCEEDED,
  COMMIT_DRAG_MOVE_FAILED,

  COMMIT_ADD_MOVE_SUBMITTED,
  COMMIT_ADD_MOVE_SUCCEEDED,
  COMMIT_ADD_MOVE_FAILED,

} from '../../reducers/quest/Quest.actions';

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

export function* contentAdd(action) {

}

export function* contentRemove(action) {

}

export function* commitDragMove(action) {

}

export function* commitAddMove(action) {

}

export function* watchFetchContentPool() {
	yield* takeEvery(FETCH_CONTENT_POOL, fetchContentPool);
}

export function* watchContentAddSubmitted() {
  yield* takeEvery(CONTENT_ADD_SUBMITTED, contentAdd);
}

export function* watchContentRemoveSubmitted() {
  yield* takeEvery(CONTENT_REMOVE_SUBMITTED, contentRemove);
}

export function* watchCommitDragMoveSubmitted() {
  yield* takeEvery(COMMIT_DRAG_MOVE_SUBMITTED, commitDragMove);
}

export function* watchCommitAddMoveSubmitted() {
  yield* takeEvery(COMMIT_ADD_MOVE_SUBMITTED, commitAddMove);
}
