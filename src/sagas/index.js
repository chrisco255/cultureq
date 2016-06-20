import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import watchCompanySubmitted from './company/Company.saga';
import watchTenantSubmitted from './tenant/Tenant.saga';
import {watchFetchProducts, watchSubmitProduct} from './product/Product.saga';

export default function* rootSaga() {
  yield [
    watchTenantSubmitted(),
    watchCompanySubmitted(),
    watchFetchProducts(),
    watchSubmitProduct()
  ];
}
