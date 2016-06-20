import React from 'react';
import { reduxForm } from 'redux-form';
// import validate from './TenantForm.validation.js';

export const fields = [
  'name',
  'content[].type',
  'content[].data',
];

let TenantForm = (props) => {
  const {
    fields: {
      name,
      content
    }, error, handleSubmit, submitting, resetForm
  } = props;
  return (
    <div>
      <h5>Create Your Own Tenant</h5>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tenant Name</label>
          <input type="text" placeholder="Put people first" { ...name } />
        </div>
        <br/>

        <div className="card">
          <div className="card-content">
            {!content.length && <div>No Content</div>}
            {content.map((item, index) =>
            <div key={index}>
              <div>
                <h6>Content #{index + 1}
                  <button className="btn waves-effect waves-light" type="button" onClick={() => {
                    content.removeField(index)
                  }}><i className="material-icons">delete</i>
                  </button>
                </h6>
                <div>
                  <label>Content Type</label>
                  <input type="text" placeholder="video" { ...item.type } />
                </div>
                <div>
                  <label>Content Data</label>
                  <input type="text" placeholder="https://www.youtube.com/watch?v=JrHGFIWX2R4" { ...item.data } />
                </div>
              </div>
            </div>)}
          </div>
        </div>


        <div>
          <button className="btn waves-effect waves-light" type="button" onClick={() => {
              content.addField()
            }}><i/> Add Content
          </button>
        </div>

        <hr />

        <button className="btn waves-effect waves-light" type="submit" disabled={submitting}>Add Tenant</button>
      </form>
    </div>
  );
}

// Composition FTW!
TenantForm = reduxForm({
	form: 'tenant',
	fields
  // validate
})(TenantForm);

export default TenantForm;
