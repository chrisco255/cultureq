export const ADD_PILLAR = 'ADD_PILLAR';
export const REMOVE_PILLAR = 'REMOVE_PILLAR';

export const PILLAR_ADDED = 'PILLAR_ADDED';
export const PILLAR_ADD_SUCCEEDED = 'PILLAR_ADD_SUCCEEDED';
export const PILLAR_ADD_FAILED = 'PILLAR_ADD_FAILED';

export function addPillar(pillar) {
	return {
		type: ADD_PILLAR,
		payload: { pillar }
	};
}

export function removePillar(pillar) {
	return {
		type: REMOVE_PILLAR,
		payload: { pillar }
	};
}
