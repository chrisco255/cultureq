import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import ContentPageStyles from '../ContentPage.css';
import validate from './QuoteForm.validation.js';

export const fields = [
  'pillarId',
  'type',
  'data.quote',
  'data.author'
];

class QuoteForm extends Component {

  componentDidMount() {
    $( "#quote" ).focus();
  }

  render() {
    const {
      fields: {
        pillarId,
        type,
        data
      }, handleSubmit, submitting
    } = this.props;

    let submitBtnClassName = 'btn waves-effect waves-light accent-background';
    if(submitting || !pillarId.value || !type.value || !data.quote || !data.author) {
      submitBtnClassName = 'btn waves-effect waves-light disabled';
    }

    return (
      <div>
        <h1>Create Quote Content</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
             <div>
               <div>
                 <label>Quote</label>
                 <input id="quote" type="text" placeholder="Take care of our peoples families, and they will take care of ours." { ...data.quote } />
                 {data.quote.touched && data.quote.error && <div style={{color: 'red'}}>{data.quote.error[0]}</div>}
               </div>
               <div>
                 <label>Quote Author</label>
                 <input type="text" placeholder="Scott Scherr" { ...data.author } />
                 {data.author.touched && data.author.error && <div style={{color: 'red'}}>{data.author.error[0]}</div>}
               </div>
             </div>
             <div style={{margin: '25px 0 25px 0'}}>
               <label>Choose a Pillar for which this Content pertains to</label>
               <select className="browser-default" { ...pillarId } >
                 <option value="0" disabled hidden>Choose a Pillar</option>
                 { this.props.pillars.map( pillar => {
                   if (!pillar.isDeleted) {
                     return (<option key={pillar._id} value={pillar._id}>{pillar.name}</option>);
                   }
                 }) }
                 <option key='noPillar' value='noPillar'>No Pillar Assigned</option>
               </select>
             </div>
            </div>
          </div>
          <div styleName="flex-end">
            <button className={submitBtnClassName} type="submit" disabled={ submitting }>Save Content</button>
          </div>
        </form>
      </div>
    );
  }

}

QuoteForm = CSSModules(QuoteForm, ContentPageStyles);

// Composition FTW!
QuoteForm = reduxForm({
	form: 'quote_content',
	fields,
  validate
})(QuoteForm);

export default QuoteForm;
