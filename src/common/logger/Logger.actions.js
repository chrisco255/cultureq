export const LOG = 'LOG';

export function log(values) {
	return {
		type: LOG,
		payload: { values }
	};
}