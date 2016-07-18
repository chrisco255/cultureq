import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import { watchFetchCompanies, watchCompanySubmitted } from './company/Company.saga';
import { watchPillarCreateSubmitted, watchPillarDeleteSubmitted, watchPillarNameChangeSubmitted, watchFetchPillars } from './pillar/Pillar.saga';
import watchContentListSubmitted from './content/Content.saga';

export default function* rootSaga() {
  yield [
  	watchFetchCompanies(),
    watchCompanySubmitted(),
    watchContentListSubmitted(),
    watchPillarCreateSubmitted(),
    watchPillarDeleteSubmitted(),
    watchPillarNameChangeSubmitted(),
    watchFetchPillars()
  ];
}
