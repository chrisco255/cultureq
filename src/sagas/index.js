import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import { watchFetchCompanies, watchCompanySubmitted } from './company/Company.saga';
import { watchFetchAnalytics } from './analytics/Analytics.saga';
import { watchPillarCreateSubmitted, watchPillarDeleteSubmitted, watchPillarNameChangeSubmitted, watchFetchPillarsSubmitted } from './pillar/Pillar.saga';
import { watchContentCreateSubmitted, watchFetchContentsSubmitted, watchContentDeleteSubmitted } from './content/Content.saga';

export default function* rootSaga() {
  yield [
  	watchFetchAnalytics(),
  	watchFetchCompanies(),
    watchCompanySubmitted(),
    watchContentCreateSubmitted(),
    watchPillarCreateSubmitted(),
    watchPillarDeleteSubmitted(),
    watchPillarNameChangeSubmitted(),
    watchFetchPillarsSubmitted(),
    watchFetchContentsSubmitted(),
    watchContentDeleteSubmitted()
  ];
}
