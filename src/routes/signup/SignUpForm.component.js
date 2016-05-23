import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import validate from './SignUp.validation';

let SignUpForm = (props) => {
  const { fields: { companyName, address }, error, handleSubmit, submitting } = props;
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
        <button type="submit" disabled={submitting} >Submit</button>
      </form>
    </div>
  );
}



// Composition FTW!
SignUpForm = reduxForm({
	form: 'signup',
	fields: ['companyName', 'address'],
  validate
})(SignUpForm);

export default SignUpForm;
