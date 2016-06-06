import React, { Component } from 'react';
import SignUpForm from './signup_form/SignUpForm.component.js';
import SignUpHeader from './signup_header/SignUpHeader.component';
import { signUpSubmitted } from './SignUp.actions.js';

class SignUp extends Component {

	onSignUpSubmit = (values, dispatch) => {
		dispatch( signUpSubmitted(values) );
		// TODO: redirect
	}

	render() {
		return (
			<div className="container">
				<SignUpHeader />
				<SignUpForm onSubmit={this.onSignUpSubmit}/>
			</div>
		);
	}
}

export default SignUp;
