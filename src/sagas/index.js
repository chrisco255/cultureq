import { watchFetchCompanies, watchCompanySubmitted } from './company/Company.saga';
import { watchFetchAnalytics } from './analytics/Analytics.saga';
import {
  watchPillarCreateSubmitted,
  watchPillarDeleteSubmitted,
  watchPillarNameChangeSubmitted,
  watchFetchPillarsSubmitted
} from './pillar/Pillar.saga';
import {
  watchContentCreateSubmitted,
  watchFetchContentsSubmitted,
  watchContentDeleteSubmitted,
  watchContentTitleChangeSubmitted,
  watchContentDescriptionChangeSubmitted,
  watchContentUrlChangeSubmitted,
  watchContentQuoteChangeSubmitted,
  watchContentAuthorChangeSubmitted,
  watchContentRecipientChangeSubmitted,
  watchContentRecipientPositionChangeSubmitted
} from './content/Content.saga';
import { watchFetchContentPool } from './quest/Quest.saga';

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
    watchContentDeleteSubmitted(),
    watchContentTitleChangeSubmitted(),
    watchContentDescriptionChangeSubmitted(),
    watchContentUrlChangeSubmitted(),
    watchContentQuoteChangeSubmitted(),
    watchContentAuthorChangeSubmitted(),
    watchContentRecipientChangeSubmitted(),
    watchContentRecipientPositionChangeSubmitted(),
    watchFetchContentPool()
  ];
}
