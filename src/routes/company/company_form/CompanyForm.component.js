import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './CompanyForm.validation';

export const fields = [
  'name',
  'address',
  'contact.name',
  'contact.email',
  'contact.phone',
  'csvFile'
];

let CompanyForm = (props) => {
  const {
    fields: {
      name,
      address,
      contact,
      csvFile
    }, error, handleSubmit, submitting
  } = props;

  var submitBtnClassName = 'btn waves-effect waves-light';
  if(submitting || !name.value || !address.value || !contact.name.value || !contact.email.value || !contact.phone.value) {
    submitBtnClassName = 'btn waves-effect waves-light disabled';
  }

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
          <input type="text" placeholder="Jane Doe" { ...contact.name } />
          {contact.name.touched && contact.name.error && <div style={{color: 'red'}}>{contact.name.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Email</label>
          <input type="email" placeholder="jane_doe@ultimatesoftware.com" { ...contact.email } />
          {contact.email.touched && contact.email.error && <div style={{color: 'red'}}>{contact.email.error}</div>}
        </div>
        <br/>
        <div>
          <label>Contact Phone</label>
          <input type="number" placeholder="9541234563" {...contact.phone} />
          {contact.phone.touched && contact.phone.error && <div style={{color: 'red'}}>{contact.phone.error}</div>}
        </div>
        <br/>
        <div>
          <div className="file-field input-field">
            <div className="btn">
              <span>Import Employees</span>
              <input type="file" { ...csvFile } value={ null } />
              {csvFile.touched && csvFile.error && <div style={{color: 'red'}}>{csvFile.error}</div>}
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" placeholder="You can drag and drop your file here too!" type="text" />
            </div>
          </div>
        </div>
        <br/>
        {error && <div style={{color: 'red'}}>{error}</div>}
        <br/>
        <button className={submitBtnClassName} type="submit" disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

// Composition FTW!
CompanyForm = reduxForm({
	form: 'company',
	fields,
  validate
})(CompanyForm);


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

export default CompanyForm;
