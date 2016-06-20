export const ADD_TENANT = 'ADD_TENANT';
export const REMOVE_TENANT = 'REMOVE_TENANT';

export const TENANT_ADDED = 'TENANT_ADDED';
export const TENANT_ADD_SUCCEEDED = 'TENANT_ADD_SUCCEEDED';
export const TENANT_ADD_FAILED = 'TENANT_ADD_FAILED';

export function addTenant(tenant) {
	return {
		type: ADD_TENANT,
		payload: { tenant }
	};
}

export function removeTenant(tenant) {
	return {
		type: REMOVE_TENANT,
		payload: { tenant }
	};
}
