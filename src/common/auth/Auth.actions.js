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