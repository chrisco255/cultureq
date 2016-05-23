export const SIGN_UP_SUBMITTED = 'SIGN_UP_SUBMITTED';
export const SIGN_UP_SUCCEEDED = 'SIGN_UP_SUCCEEDED';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';

export function signUpSubmitted({ address, companyName }) {
	return {
		type: SIGN_UP_SUBMITTED,
		payload: { address, companyName }
	};
}
