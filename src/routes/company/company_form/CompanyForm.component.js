import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './CompanyForm.validation.js';

// SignUp Form Info
var structure = {
  company: {
    name: "",
    address: "",
    contact: {
      name: "",
      phone: 0,
      email: ""
    },
    culture: {
      tenants: [{
        name: "",
        content: [{
         type: "",
         data: ""
       }]
      }]
    },
  users: [{
      email: "",
        name: ""
      }]
  }
};

let CompanyForm = (props) => {
  const {
    fields: {
      name,
      address,
      contact
    }, error, handleSubmit, submitting
  } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label>
          <input type="text" placeholder="Company Name" { ...name } />
          {name.touched && name.error && <div style={{color: 'red'}}>{name.error}</div>}
        </div>
        <br/>
        <div>
          <label>Company Address</label>
          <input type="text" placeholder="Company Address" { ...address } />
          {address.touched && address.error && <div style={{color: 'red'}}>{address.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Name</label>
          <input type="text" placeholder="Contact Name" { ...contact.name } />
          {contact.name.touched && contact.name.error && <div style={{color: 'red'}}>{contact.name.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Email</label>
          <input type="text" placeholder="Contact Email" { ...contact.email } />
          {contact.email.touched && contact.email.error && <div style={{color: 'red'}}>{contact.email.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Phone</label>
          <input type="text" placeholder="Contact Phone" { ...contact.phone } />
          {contact.phone.touched && contact.phone.error && <div style={{color: 'red'}}>{contact.phone.error}</div>}
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
	fields: ['name', 'address', 'contact.name', 'contact.email', 'contact.phone'],
  validate
})(CompanyForm);

export default CompanyForm;
