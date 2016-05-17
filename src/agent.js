'use strict';

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

let idToken = null;
const tokenPlugin = req => {
	if (idToken) {
		req.set('Authorization', `Bearer ${idToken}`);
	}
};

const requests = {
	del: url =>
		superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
	get: url =>
		superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
	put: (url, body) =>
		superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
	post: (url, body) =>
		superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
	current: () =>
		requests.get('/user'),
	login: (email, password) =>
		requests.post('/users/login', { user: { email, password } }),
	register: (username, email, password) =>
		requests.post('/users', { user: { username, email, password } }),
	save: user =>
		requests.put('/user', { user })
};

//const Comments = {
//	create: (slug, comment) =>
//		requests.post(`/articles/${slug}/comments`, { comment }),
//	delete: (slug, commentId) =>
//		requests.del(`/articles/${slug}/comments/${commentId}`),
//	forArticle: slug =>
//		requests.get(`/articles/${slug}/comments`)
//};

export default {
	Auth
	//Comments
	//setToken: _token => { token = _token; }
};
