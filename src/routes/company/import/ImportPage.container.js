import React, { Component } from 'react';
import ImportForm from './import_form/ImportForm.component';
import { importDataSubmitted } from '../../../reducers/company/Company.actions';

export default class ImportPage extends Component {

	submitImportForm = (dispatch, values) => {
		dispatch(importDataSubmitted(values));
	}

	render () {
		return (
			<ImportForm onSubmit={this.submitImportForm}/>
		);
	}
}