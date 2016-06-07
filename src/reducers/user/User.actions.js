export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGOUT = 'USER_LOGOUT';

export function login({ token, profile }) {
	return {
		type: USER_LOGIN,
		payload: { token, profile }
	};
}

export function logout() {
	return {
		type: USER_LOGOUT
	};
}
