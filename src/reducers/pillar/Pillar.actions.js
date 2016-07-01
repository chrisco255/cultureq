export const ADD_PILLAR = 'ADD_PILLAR';
export const REMOVE_PILLAR = 'REMOVE_PILLAR';

export const ADD_PILLAR_LIST = 'ADD_PILLAR_LIST';
export const ADD_PILLAR_LIST_SUCCEEDED = 'ADD_PILLAR_LIST_SUCCEEDED';
export const ADD_PILLAR_LIST_FAILED = 'ADD_PILLAR_LIST_FAILED';

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

export function addPillarList(pillars) {
	return {
		type: ADD_PILLAR_LIST,
		payload: { pillars }
	};
}
