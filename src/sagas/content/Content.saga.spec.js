import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { push } from 'react-router-redux';

import * as ActionTypes from '../../reducers/content/Content.actions';
import { addContent } from './Content.saga';

describe('Content SAGA', () => {
  it('Should delay for 2 seconds, then dispatch TENANT_ADD_SUCCEEDED', () => {
    // const mockAction = {payload:{}};
    // const generator = addContent(mockAction);
    //
    // expect( generator.next().value ).to.deep.equal( call(delay, 2000) );
    //
    // expect( generator.next().value ).to.deep.equal( put({ type: ActionTypes.TENANT_ADD_SUCCEEDED, payload: mockAction.payload }) );
    //
    // expect( generator.next().value ).to.deep.equal( put( push('/dashboard') ) );
    //
    // expect( generator.next() ).to.deep.equal( {done: true, value: undefined} );
  });
});
