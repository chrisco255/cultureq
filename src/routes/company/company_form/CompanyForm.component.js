import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './CompanyForm.validation.js';
import { Receiver } from 'react-file-uploader';

var Dropzone = require('react-dropzone');

export const fields = [
  'name',
  'address',
  'peepCSV',
  'contact.name',
  'contact.email',
  'contact.phone'
];

{/*<Receiver
  customClass={STRING_OR_ARRAY}
  style={OBJECT}
  isOpen={BOOLEAN}
  onDragEnter={FUNCTION}
  onDragOver={FUNCTION}
  onDragLeave={FUNCTION}
  onFileDrop={FUNCTION}
>
    <div>
      visual layer of the receiver (drag & drop panel)
    </div>
</Receiver>*/}

var DropzoneDemo = React.createClass({
    onDrop: function (files) {
      console.log('Received files: ', files);
    },

    render: function () {
      return (
          <div>
            <Dropzone onDrop={this.onDrop}>
              <div>Try dropping some files here, or click to select files to upload.</div>
            </Dropzone>
          </div>
      );
    }
});

let CompanyForm = (props) => {
  const {
    fields: {
      name,
      address,
      peepCSV,
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
          <input type="number" placeholder="9541234563" { ...contact.phone } />
          {contact.phone.touched && contact.phone.error && <div style={{color: 'red'}}>{contact.phone.error}</div>}
        </div>
        <br/>
        <div>
          <div className="file-field input-field">
            <div className="btn">
              <span>Import Employees</span>
              <input type="file" { ...peepCSV } />
              {peepCSV.touched && peepCSV.error && <div style={{color: 'red'}}>{peepCSV.error}</div>}
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
        </div>
        <br/>
        {/*<DropzoneDemo />*/}
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
