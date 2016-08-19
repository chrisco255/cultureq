import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import ContentPageStyles from '../ContentPage.css';
import validate from './QuoteForm.validation.js';

export const fields = [
  'pillarId',
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
        data
      }, error, handleSubmit, submitting
    } = this.props;

    let submitBtnClassName = 'btn-floating btn-large waves-effect waves-light green';
    if(submitting || !data.quote.value || !data.author.value) {
      submitBtnClassName = 'btn-floating btn-large disabled';
    }

    const errorStyle = {color: '#F44336', fontSize: '14'};

    return (
      <div>
        <h1>Create Quote Content</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
             <div>
               <div>
                 {(data.quote.touched && data.quote.error) ? <div style={errorStyle}>{data.quote.error[0]}</div> : <label>Quote</label>}
                 <input id="quote" type="text" placeholder="Take care of our peoples families, and they will take care of ours." { ...data.quote } />
               </div>
               <br/>
               <div>
                 {(data.author.touched && data.author.error) ? <div style={errorStyle}>{data.author.error[0]}</div> : <label>Author</label>}
                 <input type="text" placeholder="Scott Scherr" { ...data.author } />
               </div>
             </div>
             <div style={{margin: '25px 0 25px 0'}}>
               <label>Choose a Pillar for which this Content pertains to</label>
               <select className="browser-default" { ...pillarId } >
                 <option value="noPillar" disabled hidden>Choose a Pillar</option>
                 { this.props.pillars.map( pillar => {
                   if (!pillar.isDeleted) {
                     return (<option key={pillar._id} value={pillar._id}>{pillar.name}</option>);
                   }
                 }) }
                 <option key="noPillar" value="noPillar">No Pillar Assigned</option>
               </select>
             </div>
            </div>
            {error && <div style={{color: '#F44336'}}>{error}</div>}
          </div>
          <div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
            <button className={submitBtnClassName} type="submit" disabled={ submitting }>
              <i className="large material-icons">check</i>
            </button>
          </div>
        </form>
      </div>
    );
  }

}

QuoteForm = CSSModules(QuoteForm, ContentPageStyles);

QuoteForm = reduxForm({
	form: 'quote',
	fields,
  validate
})(QuoteForm);

export default QuoteForm;
