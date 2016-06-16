export const ADD_TENANT = 'ADD_TENANT';
export const REMOVE_TENANT = 'REMOVE_TENANT';

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
