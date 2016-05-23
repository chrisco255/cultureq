/*
 Container Components are Redux-ified react components which should typically represent a single route/page
 within an application. Their purpose is to map Redux concepts like state from a store and the action dispatcher
 to props that can be passed to child components.

 You should generally avoid placing HTML tags in the render method of this file.  Instead, componentize your route
 like so:

 render = () => {
 return (
	 <div>
		 <HeroImage url={this.props.url} />
		 <FeatureBody { ...this.props } />
	 </div>
 );
 }

 NOTE: The use of ES7-style fat arrow function assignment (as in 'logout = () => {}') ensures that 'this'
 will always refer to the context of the class itself
 */

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
