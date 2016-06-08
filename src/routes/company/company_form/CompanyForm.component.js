import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './CompanyForm.validation.js';

// SignUp Form Info
var structure = {
  company: {
    name: "",
    address: "",
    contact: {
      cname: "",
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
          <input type="text" placeholder="Ultimate Software" { ...name } />
          {name.touched && name.error && <div style={{color: 'red'}}>{name.error}</div>}
        </div>
        <br/>
        <div>
          <label>Company Address</label>
          <input type="text" placeholder="2000 Ultimate Way Weston, FL 33326" { ...address } />
          {address.touched && address.error && <div style={{color: 'red'}}>{address.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Name</label>
          <input type="text" placeholder="Jane Doe" { ...contact.cname } />
          {contact.cname.touched && contact.cname.error && <div style={{color: 'red'}}>{contact.cname.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Email</label>
          <input type="text" placeholder="jane_doe@ultimatesoftware.com" { ...contact.email } />
          {contact.email.touched && contact.email.error && <div style={{color: 'red'}}>{contact.email.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Phone</label>
          <input type="text" placeholder="9541234563" { ...contact.phone } />
          {contact.phone.touched && contact.phone.error && <div style={{color: 'red'}}>{contact.phone.error}</div>}
        </div>
        <br/>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <br/>
        <button className="btn waves-effect waves-light" type="submit" disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

// Composition FTW!
CompanyForm = reduxForm({
	form: 'company',
	fields: ['name', 'address', 'contact.cname', 'contact.email', 'contact.phone'],
  validate
})(CompanyForm);

export default CompanyForm;
