import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import CompanyForm from './company_form/CompanyForm.component';
import { fetchCompanies, companySubmitted } from '../../reducers/company/Company.actions';
import styles from './CompanyPage.css';

const query = `
  {
    tenants {
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
`;

const mapDispatchToProps = (dispatch) => ({
	onLoad: () => dispatch( fetchCompanies({ query }) )
});

class CompanyPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	onCompanyFormSubmit = (values, dispatch) => {
		dispatch( companySubmitted(values) );
	}

	render() {
		return (
			<div className="container">
				<div>
					<h1 styleName='title'>Getting Started!</h1>
					<p styleName='instructions'>Fill out the following form about your company.</p>
				</div>
				<CompanyForm onSubmit={this.onCompanyFormSubmit}/>
			</div>
		);
	}
}

CompanyPage = CSSModules(CompanyPage, styles);
export default connect(null, mapDispatchToProps)(CompanyPage);
