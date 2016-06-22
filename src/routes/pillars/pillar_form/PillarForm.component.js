import React from 'react';
import { reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import PillarsPageStyles from '../PillarsPage.css';
import _ from 'lodash';
import validate from './PillarForm.validation.js';

export const fields = [
  'name',
  'content[].type',
  'content[].data'
];

let PillarForm = (props) => {
  const {
    fields: {
      name,
      content
    }, error, handleSubmit, submitting, resetForm
  } = props;

  var submitBtnClassName = 'btn waves-effect waves-light';
  if(submitting || !content.length) {
    submitBtnClassName = 'btn waves-effect waves-light disabled';
  }

  //quote needs the quote and author
  //video needs title, description, and url
  //survey from sparksurveys
  //lunch-meeting needs name and title
  const contentData = (type) => {
    if(type.value === "video") {
      fields.push('content[].data.title', 'content[].data.description', 'content[].data.url');
      return "video";
    }
    if(type.value === "quote") {
      fields.push('content[].data.quote', 'content[].data.author');
      return "quote";
    }
    if(type.value === "lunch") {
      fields.push('content[].data.fullname', 'content[].data.position');
      return "lunch";
    }
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

        {!content.length &&
          <div className="card">
            <div className="card-content">
            <p>No Content</p>
          </div>
        </div>}

        {content.map((item, index) =>
        <div className="card">
          <div className="card-content">
            <div key={index}>
              <div>
                <h6 styleName="flex-space-between">Content #{index + 1}
                  <button className="btn-floating waves-effect waves-light red" type="button" onClick={() => {
                    content.removeField(index)
                  }}><i className="material-icons">delete</i>
                  </button>
                </h6>
                <div>
                  <label>Content Type</label>
                  <select className="browser-default" { ...item.type } >
                    <option value="" disabled selected>Choose content type</option>
                    <option value="video">video</option>
                    <option value="quote">quote</option>
                    <option value="lunch">lunch meeting</option>
                  </select>
                </div>
                { (contentData(item.type) === 'video') &&
                <div>
                  <div>
                    <label>Video Title</label>
                    <input type="text" placeholder="Ultimate Software TechStars" { ...item.data.title } />
                  </div>
                  <div>
                    <label>Video Description</label>
                    <input type="text" placeholder="Awesome video on our great intern program, check it out!" { ...item.data.description } />
                  </div>
                  <div>
                    <label>Video URL</label>
                    <input type="text" placeholder="https://www.youtube.com/watch?v=JrHGFIWX2R4" { ...item.data.url } />
                  </div>
                </div> }
                { (contentData(item.type) === 'quote') &&
               <div>
                 <div>
                   <label>Quote</label>
                   <input type="text" placeholder="Take care of our peoples families, and they will take care of ours." { ...item.data.quote } />
                 </div>
                 <div>
                   <label>Quote Author</label>
                   <input type="text" placeholder="Scott Scherr" { ...item.data.author } />
                 </div>
               </div> }
               { (contentData(item.type) === 'lunch') &&
              <div>
                <div>
                  <label>Name</label>
                  <input type="text" placeholder="Scott Scherr" { ...item.data.fullname } />
                </div>
                <div>
                  <label>Position</label>
                  <input type="text" placeholder="CEO" { ...item.data.position } />
                </div>
              </div> }
              </div>
            </div>
          </div>
        </div>)}

        <div>
          <button className="btn waves-effect waves-light" type="button" onClick={() => {
              content.addField()
            }}><i/> Add Content
          </button>
        </div>

        <hr />

        <button id="submit-btn" className={submitBtnClassName} type="submit" disabled={ submitting || !content.length }>Add Pillar</button>
      </form>
    </div>
  );
}

PillarForm = CSSModules(PillarForm, PillarsPageStyles);

// Composition FTW!
PillarForm = reduxForm({
	form: 'pillar',
	fields,
  validate
})(PillarForm);

export default PillarForm;
