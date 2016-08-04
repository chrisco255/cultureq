export const FETCH_ANALYTICS = 'FETCH_ANALYTICS';
export const FETCH_ANALYTICS_SUCCEEDED = 'FETCH_ANALYTICS_SUCCEEDED';
export const FETCH_ANALYTICS_FAILED = 'FETCH_ANALYTICS_FAILED';

export function fetchAnalytics({ query }) {
	return {
		type: FETCH_ANALYTICS,
		payload: { query }
	};
}
