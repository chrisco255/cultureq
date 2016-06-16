import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CompanyForm from './company_form/CompanyForm.component';
import { companySubmitted } from '../../reducers/company/Company.actions';
import styles from './CompanyPage.css';
import axios from 'axios';
import 'whatwg-fetch';

class CompanyPage extends Component {

	onCompanyFormSubmit = (values, dispatch) => {

		console.log('Company Form Values', values);

		// var data = new FormData();
		// data.append('file', values.peepCSV[0]);
		//
		// fetch('http://localhost:1996/csv', {
		// 	method: 'POST',
		// 	body: data
		// });

		axios.post('http://localhost:1996/csv', {
			data:  values.peepCSV[0]
		})
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
