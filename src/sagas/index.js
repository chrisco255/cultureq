import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import { watchFetchCompanies, watchCompanySubmitted } from './company/Company.saga';
import { watchFetchProducts, watchSubmitProduct } from './product/Product.saga';
import watchTenantSubmitted from './tenant/Tenant.saga';

export default function* rootSaga() {
  yield [
  	watchFetchCompanies(),
    watchTenantSubmitted(),
    watchCompanySubmitted(),
    watchFetchProducts(),
    watchSubmitProduct()
  ];
}
