import { expect } from 'chai';
import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import { submitSignUp } from './SignUpSubmission.saga';

describe('SignUpSubmission SAGA', () => {
  xit('Should delay for 2 seconds, then dispatch SIGN_UP_SUCCEEDED', () => {
    const mockAction = {};
    const generator = submitSignUp(mockAction);

    expect( generator.next().value ).to.deep.equal( call(delay, 2000) );

    expect( generator.next().value ).to.deep.equal( put({type: 'SIGN_UP_SUCCEEDED', payload: mockAction}) );

    expect( generator.next().value ).to.deep.equal( {done: true, value: undefined} );
  });
});
