export const FETCH_COMPANIES_SUCCEEDED = 'FETCH_COMPANIES_FAILED';
export const FETCH_COMPANIES_FAILED = 'FETCH_COMPANIES_FAILED';
export const FETCH_COMPANIES = 'FETCH_COMPANIES';

export const COMPANY_SUBMITTED = 'COMPANY_SUBMITTED';
export const COMPANY_SUBMIT_SUCCEEDED = 'COMPANY_SUBMIT_SUCCEEDED';
export const COMPANY_SUBMIT_FAILED = 'COMPANY_SUBMIT_FAILED';

// export const IMPORT_DATA_SUBMITTED = 'IMPORT_DATA_SUBMITTED';
// export const IMPORT_DATA_SUBMIT_SUCCEEDED = 'IMPORT_DATA_SUBMIT_SUCCEEDED';
// export const IMPORT_DATA_SUBMIT_FAILED = 'IMPORT_DATA_SUBMIT_FAILED';


export function fetchCompanies({ query }) {
	return {
		type: FETCH_COMPANIES,
		payload: { query }
	};
}

export function companySubmitted({ address, name, contact, csvFile }) {
	return {
		type: COMPANY_SUBMITTED,
		payload: { address, name, contact, csvFile }
	};
}

// export function importDataSubmitted (values) {
// 	return {
// 		type: IMPORT_DATA_SUBMITTED,
// 		payload: values
// 	}
// }