import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { submitSignUp } from './SignUpSubmission.saga';

describe('SignUpSubmission SAGA', () => {
  it('Should delay for 2 seconds, then dispatch SIGN_UP_SUCCEEDED', () => {
    const mockAction = {payload:{}};
    const generator = submitSignUp(mockAction);

    expect( generator.next().value ).to.deep.equal( call(delay, 2000) );

    expect( generator.next().value ).to.deep.equal( put({ type: 'SIGN_UP_SUCCEEDED', payload: mockAction.payload }) );

    expect( generator.next() ).to.deep.equal( {done: true, value: undefined} );
  });
});
