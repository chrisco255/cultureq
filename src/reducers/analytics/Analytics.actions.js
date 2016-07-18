export const FETCH_ANALYTICS = 'FETCH_ANALYTICS';

export function fetchAnalytics({ query }) {
	return {
		type: FETCH_ANALYTICS,
		payload: { query }
	};
}