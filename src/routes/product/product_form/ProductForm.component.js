import React from 'react';
import { reduxForm } from 'redux-form';
import validate from './ProductForm.validation';

export const fields = [
  'improvements',
  'status',
  'proposal_id',
  '_id'
];

let ProductForm = (props) => {
  const {
    fields: {
      improvements,
      status,
      _id,
      proposal_id
    }, error, handleSubmit, submitting
  } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Status</label>
          <input type="text" { ...status } />
          {status.touched && status.error && <div style={{color: 'red'}}>{status.error}</div>}
        </div>
        <br />
        <div>
          <label>Improvements</label>
          <input type="number" { ...improvements } />
          {improvements.touched && improvements.error && <div style={{color: 'red'}}>{improvements.error}</div>}
        </div>
        <br />
        <div>
          <label>_id</label>
          <input type="number" { ..._id } />
          {_id.touched && _id.error && <div style={{color: 'red'}}>{_id.error}</div>}
        </div>
        <br />
        <div>
          <label>Proposal ID</label>
          <input type="number" { ...proposal_id } />
          {proposal_id.touched && proposal_id.error && <div style={{color: 'red'}}>{proposal_id.error}</div>}
        </div>
        <br />
        <button className="btn waves-effect waves-light" type="submit" disabled={submitting}>Submit</button>
      </form>
    </div>
  );
}

// Composition FTW!
ProductForm = reduxForm({
	form: 'product',
	fields,
  validate
})(ProductForm);

export default ProductForm;
