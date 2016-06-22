import { put, call, fork } from 'redux-saga/effects';
import { takeEvery, delay } from 'redux-saga';
import { push } from 'react-router-redux';
import axios from 'axios';
import * as ActionTypes from '../../reducers/company/Company.actions';

//fetching of companies
const fetch = (query) => {
	return axios.get(`http://localhost:7990/graphql?query=${encodeURIComponent(query)}`)
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


export function* watchFetchCompanies() {
	yield* takeEvery(ActionTypes.FETCH_COMPANIES, fetchCompanies);
}

//posting tenant top level form data
const postTenant = (body) => {
	return axios.post('http://localhost:8000/tenants', body).then( response => response.data );
}

const postFile = (body) => {
	return axios.post('http://localhost:8000/csv', body).then( response => response.data );
}

export function* companySubmit(action) {
	try {
		const createResponse = yield call(postTenant, {
			type: 'command.TENANT_CREATE',
			payload: action.payload
		});
		const tenantID = createResponse._id;

		const hasCSV = action.payload.csvFile && action.payload.csvFile.length > 0;
		if (hasCSV) {
			const csvPostBody = new FormData();
			csvPostBody.append('csvFile', action.payload.csvFile[0]);
			csvPostBody.append('type', 'command.TENANT_EMPLOYEE_DATA_IMPORT');
			csvPostBody.append('tenantID', tenantID);
			const importResponse = yield call(postFile, csvPostBody);
		}

		yield put( {type: ActionTypes.COMPANY_SUBMIT_SUCCEEDED, payload: createResponse} );
		yield put( push('/pillars') );
	} catch (error) {
		yield put( {type: ActionTypes.COMPANY_SUBMIT_FAILED, error} );
	}
}

export function* watchCompanySubmitted() {
	yield* takeEvery(ActionTypes.COMPANY_SUBMITTED, companySubmit);
}


//importing CSVs for employees in a tenant

// export function* fileImportSubmit(action) {
// 	try {
// 		const body = new FormData();
// 		body.append('csvFile', action.payload.csvFile[0]);
// 		body.append('type', 'command.TENANT_EMPLOYEE_DATA_IMPORT');
// 		const payload = yield call(postFile, body);
// 		yield put( {type: ActionTypes.IMPORT_DATA_SUBMIT_SUCCEEDED, payload} );
// 	} catch (error) {
// 		yield put( {type:ActionTypes.IMPORT_DATA_SUBMIT_FAILED, error} );
// 	}
// }

// export function* watchCompanyImportSubmitted() {
// 	yield* takeEvery(ActionTypes.IMPORT_DATA_SUBMITTED, fileImportSubmit);
// }
