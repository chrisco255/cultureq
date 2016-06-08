export const COMPANY_SUBMITTED = 'COMPANY_SUBMITTED';
export const COMPANY_SUBMIT_SUCCEEDED = 'COMPANY_SUBMIT_SUCCEEDED';
export const COMPANY_SUBMIT_FAILED = 'COMPANY_SUBMIT_FAILED';

export function companySubmitted({ address, name, contact: { cname, email, phone } }) {
	/* NOTE: name property inside of contact needs to be different
	 	 or else it will complain */
	return {
		type: COMPANY_SUBMITTED,
		payload: { address, name, contact: { cname, email, phone } }
	};
}
