import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import { push } from 'react-router-redux';
import axios from 'axios';
import * as ActionTypes from '../../reducers/company/Company.actions';

//fetching of companies
const fetch = (query) => {
	return axios.post(`/api/graphql`, { query })
							.then( response =>  response.data.data );
}

const fetchWithFile = (query, data) => {
	return axios.post(`/api/graphql?query=${encodeURIComponent(query)}`, data)
							.then( response => response.data.data );
}

export function* fetchCompanies(action) {
	try {
		const payload = yield call(fetch, action.payload.query);
		yield put( {type: ActionTypes.FETCH_COMPANIES_SUCCEEDED, payload } );
	} catch (error) {
		yield put( {type: ActionTypes.FETCH_COMPANIES_FAILED, error} );
	}
}

export function* companySubmit(action) {
	try {
		const { name, address, contact } = action.payload
		const createResponse = yield call(fetch, `
			mutation {
			  mutation: TENANT_CREATE(
			    name: "${name}"
			    address: "${address}"
			    contact: {
			      name: "${contact.name}"
			      email: "${contact.email}"
			      phone: ${contact.phone}
			    }
			  ) {
			    _id
					name
					address
					contact {
						name
						email
						phone
					}
			  }
			}
		`);
		const mutationResponse = createResponse.mutation;
		const tenantId = mutationResponse._id;

		const hasCSV = action.payload.csvFile && action.payload.csvFile.length > 0;
		if (hasCSV) {
			const csvPostBody = new FormData();
			csvPostBody.append('file', action.payload.csvFile[0]);
			// csvPostBody.append('type', 'command.TENANT_EMPLOYEE_DATA_IMPORT');
			csvPostBody.append('tenantId', tenantId);

			const query = `
			mutation {
				mutation: EMPLOYEE_IMPORT_SAGA {
					employeesCreated
					errorCount
				}
			}
			`

			const importResponse = yield call(fetchWithFile, query, csvPostBody);
			console.log(importResponse.mutation);
		}

		yield put( {type: ActionTypes.COMPANY_SUBMIT_SUCCEEDED, payload: mutationResponse} );
		yield put( push('/pillar') );
	} catch (error) {
		yield put( {type: ActionTypes.COMPANY_SUBMIT_FAILED, error} );
	}
}

export function* watchFetchCompanies() {
	yield* takeEvery(ActionTypes.FETCH_COMPANIES, fetchCompanies);
}

export function* watchCompanySubmitted() {
	yield* takeEvery(ActionTypes.COMPANY_SUBMITTED, companySubmit);
}
