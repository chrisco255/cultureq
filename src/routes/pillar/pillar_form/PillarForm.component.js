
import React from 'react';
import { reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import PillarPageStyles from '../PillarPage.css';
import validate from './PillarForm.validation.js';

export const fields = [
  'name'
];

let PillarForm = (props) => {
  const {
    fields: {
      name
    }, handleSubmit, submitting
  } = props;

  let submitBtnClassName = 'btn waves-effect waves-light';
  if(submitting) {
    submitBtnClassName = 'btn waves-effect waves-light disabled';
  }

  return (
    <div>
      <h1 styleName="title">Create Your Own Cultural Pillar</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div>
          <label>Pillar Name</label>
          <input type="text" placeholder="Put people first" { ...name } />
          {name.touched && name.error && <div style={{color: 'red'}}>{name.error}</div>}
        </div>

        <div styleName="flex-end">
          <button className={submitBtnClassName} type="submit" disabled={ submitting }>Save Pillar</button>
        </div>
      </form>
    </div>
  );
};

PillarForm = CSSModules(PillarForm, PillarPageStyles);

// Composition FTW!
PillarForm = reduxForm({
	form: 'pillar',
	fields,
  validate
})(PillarForm);

export default PillarForm;
