'use strict';

/******************************************************************************
*** HELPERS                                                                 ***
******************************************************************************/
export const ASYNC_START = 'ASYNC_START';
export const ASYNC_END = 'ASYNC_END';

export const LOG = 'LOG';

export function log(values) {
    return {
        type: LOG,
        payload: { values }
    };
}


/******************************************************************************
*** USER ACTIONS                                                            ***
******************************************************************************/
export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export function login(idToken) {
    return {
        type: USER_LOGIN,
        payload: { idToken }
    };
}

export function logout() {
    return {
        type: USER_LOGOUT
    };
}


/******************************************************************************
*** SIGN UP FORM ACTIONS                                                    ***
******************************************************************************/
export const SIGN_UP_SUBMITTED = 'SIGN_UP_SUBMITTED';
export const SIGN_UP_SUCCEEDED = 'SIGN_UP_SUCCEEDED';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';

export function signUpSubmitted({ address, companyName }) {
    return {
        type: SIGN_UP_SUBMITTED,
        payload: { address, companyName }
    };
}
