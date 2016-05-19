import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import SignUpForm from '../components/SignUpForm';
import {signUpSubmitted} from '../actions';

let SignUp = React.createClass({
	onSignUpSubmit(values, dispatch) {
		dispatch(signUpSubmitted(values));
	},

	render() {
		return (
			<div>
				<h1>Complete This form to sign up!</h1>
				<SignUpForm onSubmit={this.onSignUpSubmit}/>
			</div>
		);
	}
});

export default SignUp;
