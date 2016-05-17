export function login(idToken) {
    return {
        type: 'LOGIN',
        payload: { idToken }
    }
}

export function logout() {
    return {
        type: 'LOG_OUT'
    }
}