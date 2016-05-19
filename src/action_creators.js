export function login(idToken) {
    return {
        type: 'LOGIN',
        payload: { idToken }
    };
}

export function logout() {
    return {
        type: 'LOG_OUT'
    };
}

export function log(values) {
    return { 
        type: 'LOG',
        payload: { values }
    };
}

export function signUpSubmitted({ address, companyName }) {
    return {
        type: 'SIGN_UP_SUBMITTED',
        payload: Promise.resolve({ address, companyName })
    };
}