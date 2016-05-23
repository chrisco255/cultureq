import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

let SignUpForm = (props) => {
  const { fields: { companyName, address }, error, handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label>
          <input type="text" placeholder="Company Name" { ...companyName } />
          {companyName.touched && companyName.error && <div style={{color: 'red'}}>{companyName.error}</div>}
        </div>
        <br/>
        <div>
          <label>Address</label>
          <input type="text" placeholder="Address" { ...address } />
          {address.touched && address.error && <div style={{color: 'red'}}>{address.error}</div>}
        </div>
        <br/>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <br/>
        <button type="submit" >Submit</button>
      </form>
    </div>
  );
}

const validate = (values) => {
	const errors = {};

	if (!values.companyName)  errors.companyName = 'Required';
	else if (values.companyName.length < 6)  errors.companyName = 'Length must be atleast 6 characters';
  // else if ( isNaN(values.companyName) ) errors.companyName = 'Must be a Number';

  if (!values.address)  errors.address = 'Required';
	else if (values.address.length < 6)  errors.address = 'Length must be atleast 6 characters';

	return errors;
}

// Composition FTW!
SignUpForm = reduxForm({
	form: 'signup',
	fields: ['companyName', 'address'],
  validate
})(SignUpForm);

export default SignUpForm;
