import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import { watchFetchCompanies, watchCompanySubmitted } from './company/Company.saga';
import watchPillarListSubmitted from './pillar/Pillar.saga';
import watchContentListSubmitted from './content/Content.saga';

export default function* rootSaga() {
  yield [
  	watchFetchCompanies(),
    watchPillarListSubmitted(),
    watchCompanySubmitted(),
    watchContentListSubmitted()
  ];
}
