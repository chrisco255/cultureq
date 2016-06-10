import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import watchCompanySubmitted from './company/Company.saga';
import watchFetchProducts from './product/Product.saga';

export default function* rootSaga() {
  yield [
    watchCompanySubmitted(),
    watchFetchProducts()
  ];
}
