import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import TenantsPageStyles from './TenantsPage.css';
import { Link, IndexLink } from 'react-router';
import _ from 'lodash';
import { addTenant, removeTenant } from '../../reducers/tenant/Tenant.actions';

const mapDispatchToProps = (dispatch) => {
	return {
		addTenant: (tenant) =>
			dispatch(addTenant(tenant)),
		removeTenant: (tenant) =>
		 	dispatch(removeTenant(tenant))
	}
}

const mapStateToProps = (state) => {
	return {
		tenants: state.tenant.tenants,
		selectedTenants: state.tenant.selectedTenants
	}
}

class TenantsPage extends Component {

	render() {

		const listTenants = this.props.tenants.map( (tenant) => {
			return (
				<a className="collection-item hand" key={tenant.name} onClick={this.props.addTenant.bind(this, tenant)}>
					{tenant.name}
					<div className="secondary-content">
						<i className="material-icons">add_circle</i>
					</div>
				</a>
			);
		});

		const listSelectedTenants = this.props.selectedTenants.map( (tenant) => {
			return (
				<a className="collection-item hand" key={tenant.name} onClick={this.props.removeTenant.bind(this, tenant)}>
					{tenant.name}
					<div className="secondary-content">
						<i className="material-icons">delete</i>
					</div>
				</a>
			);
		});

		return (
				<div className="row">
					<div className="col s3" styleName="side-bar">
						<div className="container">
		    			<h1 styleName="title">Selected Tenants</h1>
							<hr/>
							<div>
					 			<div className="collection">
					 			 {listSelectedTenants}
					 			</div>
				 		 </div>
	    			</div>
					</div>
					<div className="col s9">
						<div className="container">
							<h1 styleName="title">Choose Your Tenants</h1>
							<hr/>
							<div>
					 			<div className="collection">
					 			 {listTenants}
					 			</div>
				 		 </div>
						</div>
					</div>
     		</div>
		);
	}

}

TenantsPage = CSSModules(TenantsPage, TenantsPageStyles);
export default connect(mapStateToProps, mapDispatchToProps)(TenantsPage);
