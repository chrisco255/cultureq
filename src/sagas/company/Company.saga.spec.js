import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/company/Company.actions';
import { companySubmit } from './Company.saga';

describe('Company SAGA', () => {
  it('Should delay for 2 seconds, then dispatch COMPANY_SUBMIT_SUCCEEDED', () => {
    const mockAction = {payload:{}};
    const generator = companySubmit(mockAction);

    expect( generator.next().value ).to.deep.equal( call(delay, 2000) );

    expect( generator.next().value ).to.deep.equal( put({ type: ActionTypes.COMPANY_SUBMIT_SUCCEEDED, payload: mockAction.payload }) );

    expect( generator.next().value ).to.deep.equal( put( push('/dashboard') ) );

    expect( generator.next() ).to.deep.equal( {done: true, value: undefined} );
  });
});
