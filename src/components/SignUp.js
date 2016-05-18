import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

let SignUp = React.createClass({
	render() {
		const { fields: { companyName, address } } = this.props;
		return (
			<div>
				<h1>Complete This form to sign up!</h1>

				<form onSubmit={}>
					<div>
						<label>Company Name</label>
						<input type="text" placeholder="Company Name" { ...companyName } />
					</div>
					<div>
						<label>Address</label>
						<input type="text" placeholder="Address" {...address} />
					</div>
					<input type="submit" />
				</form>
			</div>
		);
	}
});

SignUp = reduxForm({
	form: 'signup',
	fields: ['companyName', 'address']
})(SignUp);

export default SignUp;
