import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CompanyForm from './company_form/CompanyForm.component';
import { companySubmitted } from '../../reducers/company/Company.actions';
import styles from './CompanyPage.css';
import axios from 'axios';

class CompanyPage extends Component {

	onCompanyFormSubmit = (values, dispatch) => {

		console.log('Company Form Values', values);
		let formData = new FormData();
		for (let key of Object.keys(values)) {
			let value = values[key];
			if (typeof value === 'object') {
				if (value instanceof FileList) {
					value = value[0]; //only works for FileLists with one file. also, what happens if form is submitted w/o file?
				} else {
					value = JSON.stringify(value);
				}
			}
			formData.append(key, value);
		}

		axios.post('http://localhost:1996/tenants', formData)
		.then(function (response) {
			console.log('SUCCESS', response);
			dispatch( companySubmitted(values) );
		})
		.catch(function (response) {
			console.log('ERROR', response);
		});

	}

	render() {
		return (
			<div className="container">
				<div>
					<h1 styleName='title'>Let's get started!</h1>
					<p styleName='instructions'>Fill out the following form about your company.</p>
				</div>
				<CompanyForm onSubmit={this.onCompanyFormSubmit}/>
			</div>
		);
	}
}

export default CSSModules(CompanyPage, styles);
