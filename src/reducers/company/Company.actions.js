export const COMPANY_SUBMITTED = 'COMPANY_SUBMITTED';
export const COMPANY_SUBMIT_SUCCEEDED = 'COMPANY_SUBMIT_SUCCEEDED';
export const COMPANY_SUBMIT_FAILED = 'COMPANY_SUBMIT_FAILED';

export function companySubmitted({ address, companyName }) {
	return {
		type: COMPANY_SUBMITTED,
		payload: { address, companyName }
	};
}
