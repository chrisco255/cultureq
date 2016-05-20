import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import SignUpForm from './SignUpForm.component';
import { signUpSubmitted } from './SignUp.actions';

class SignUp extends Component {
	onSignUpSubmit = (values, dispatch) => {
		dispatch(signUpSubmitted(values));
	}

	render = () =>  {
		return (
			<div>
				<h1>Complete This form to sign up!</h1>
				<SignUpForm onSubmit={this.onSignUpSubmit}/>
			</div>
		);
	}
}

export default SignUp;
