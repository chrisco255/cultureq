import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './CompanyForm.validation.js';

let CompanyForm = (props) => {
  const { fields: { name, address, contactEmail }, error, handleSubmit, submitting } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label>
          <input type="text" placeholder="Company Name" { ...name } />
          {companyName.touched && companyName.error && <div style={{color: 'red'}}>{companyName.error}</div>}
        </div>
        <br/>
        <div>
          <label>Address</label>
          <input type="text" placeholder="Address" { ...address } />
          {address.touched && address.error && <div style={{color: 'red'}}>{address.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Email</label>
          <input type="text" placeholder="Contact Email" { ...contactEmail } />
          {contactEmail.touched && contactEmail.error && <div style={{color: 'red'}}>{contactEmail.error}</div>}
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
CompanyForm = reduxForm({
	form: 'company',
	fields: ['name', 'address', 'contactEmail'],
  validate
})(CompanyForm);

export default CompanyForm;
