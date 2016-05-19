import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import SignUpForm from './SignUpForm';
import {signUpSubmitted} from '../action_creators';

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
