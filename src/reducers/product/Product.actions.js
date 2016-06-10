export const PRODUCTS_FETCHED = 'PRODUCTS_FETCHED';
export const FETCH_PRODUCTS_SUCCEEDED = 'FETCH_PRODUCTS_SUCCEEDED';
export const FETCH_PRODUCTS_FAILED = 'FETCH_PRODUCTS_FAILED';
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

export const CREATE_POST = 'CREATE_POST';

export function fetchProducts({ query }) {
	return {
		type: FETCH_PRODUCTS,
		payload: { query }
	};
}

export function createProduct({ proposal_id, _id, status, improvements }) {
	return {
		type: CREATE_POST,
		payload: { proposal_id, _id, status, improvements }
	};
}
