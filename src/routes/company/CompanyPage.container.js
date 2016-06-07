import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import CompanyForm from './company_form/CompanyForm.component';
import { companySubmitted } from '../../reducers/company/Company.actions';
import styles from './CompanyPage.css';

class CompanyPage extends Component {

	onCompanyFormSubmit = (values, dispatch) => {
		dispatch( companySubmitted(values) );
	}

	render() {
		return (
			<div className="container">
				<div>
					<h1 styleName='title'>Sign Up For Shockingly Good Savings</h1>
					<p styleName='instructions'>Howdy ho!</p>
				</div>
				<CompanyForm onSubmit={this.onCompanyFormSubmit}/>
			</div>
		);
	}
}

export default CSSModules(CompanyPage, styles);
