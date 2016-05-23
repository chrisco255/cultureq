import React, { Component, PropTypes } from 'react';
import { reduxForm, show as showResults } from 'redux-form';
import SignUpForm from './SignUpForm.component';
import { signUpSubmitted } from './SignUp.actions';

class SignUp extends Component {

	onSignUpSubmit = (values, dispatch) => {
		return new Promise( (resolve, reject) => {
	    setTimeout(() => {
	      if (![ 'john', 'paul', 'george', 'ringo' ].includes(values.companyName)) {
	        reject({ companyName: 'Company does not exist', _error: 'Login failed!' });
	      } else if (values.address !== 'redux-form') {
	        reject({ address: 'Wrong address', _error: 'Login failed!' })
	      } else {
	        dispatch( signUpSubmitted(values) );
	        resolve()
	      }
	    }, 2000) // simulate server latency
	  })
	}

	render() {
		return (
			<div>
				<h1>Complete This form to sign up!</h1>
				<SignUpForm onSubmit={this.onSignUpSubmit}/>
			</div>
		);
	}
}

export default SignUp;
