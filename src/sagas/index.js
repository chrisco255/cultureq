import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import { watchFetchCompanies, watchCompanySubmitted } from './company/Company.saga';
import { watchFetchAnalytics } from './analytics/Analytics.saga';
import { watchPillarCreateSubmitted, watchPillarDeleteSubmitted, watchPillarNameChangeSubmitted, watchFetchPillars } from './pillar/Pillar.saga';
import watchContentListSubmitted from './content/Content.saga';

export default function* rootSaga() {
  yield [
  	watchFetchAnalytics(),
  	watchFetchCompanies(),
    watchCompanySubmitted(),
    watchContentListSubmitted(),
    watchPillarCreateSubmitted(),
    watchPillarDeleteSubmitted(),
    watchPillarNameChangeSubmitted(),
    watchFetchPillars()
  ];
}
