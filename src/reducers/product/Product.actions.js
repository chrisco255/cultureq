// export const PRODUCTS_FETCHED = 'PRODUCTS_FETCHED';
export const FETCH_PRODUCTS_SUCCEEDED = 'FETCH_PRODUCTS_SUCCEEDED';
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const PRODUCT_SUBMITTED = 'PRODUCT_SUBMITTED'
export const PRODUCT_SUBMIT_SUCCEEDED = 'PRODUCT_SUBMIT_SUCCEEDED';
export const PRODUCT_SUBMIT_FAILED = 'PRODUCT_SUBMIT_FAILED';

export function fetchProducts({ query }) {
	return {
		type: FETCH_PRODUCTS,
		payload: { query }
	};
}

export function productSubmitted({ proposal_id, _id, status, improvements }) {
	return {
		type: PRODUCT_SUBMITTED,
		payload: { proposal_id, _id, status, improvements }
	};
}