import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CompanyForm from './company_form/CompanyForm.component';
import { companySubmitted } from '../../reducers/company/Company.actions';
import styles from './CompanyPage.css';

class CompanyPage extends Component {

	onCompanyFormSubmit = (values, dispatch) => {
		console.log('Company Form Values: ', values);
		dispatch( companySubmitted(values) );
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
