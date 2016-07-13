import React from 'react';
import { reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import ContentPageStyles from '../ContentPage.css';
import _ from 'lodash';
import validate from './ContentForm.validation.js';

export const fields = [
  'pillarId',
  'type',
  'data.title',
  'data.description',
  'data.url',
  'data.quote',
  'data.author',
  'data.fullname',
  'data.position'
];

let ContentForm = (props) => {
  const {
    fields: {
      pillarId,
      type,
      data
    }, error, handleSubmit, submitting, resetForm
  } = props;

  var submitBtnClassName = 'btn waves-effect waves-light';
  if(submitting) {
    submitBtnClassName = 'btn waves-effect waves-light disabled';
  }

  return (
    <div>
      <h1 styleName="title">Create Your Own Cultural Content</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-content">
            <div>
              <div>
                <div>
                  <label>Choose a Pillar for which this Content pertains to</label>
                  <select className="browser-default" { ...pillarId } >
                  {/*Need to get the already selected pillars and display them here*/}
                    <option value="0" disabled hidden>Choose a Pillar</option>
                    <option value="pillarId1">PillarName1</option>
                    <option value="pillarId2">PillarName2</option>
                    <option value="pillarId3">PillarName3</option>
                  </select>
                </div>
                <div>
                  <label>Content Type</label>
                  <select className="browser-default" { ...type } >
                    <option value="0" disabled hidden>Choose content type</option>
                    <option value="video">video</option>
                    <option value="quote">quote</option>
                    <option value="lunch">lunch meeting</option>
                  </select>
                </div>
                { (type.value === 'video') &&
                <div>
                  <div>
                    <label>Video Title</label>
                    <input type="text" placeholder="Ultimate Software TechStars" { ...data.title } />
                    {data.title.touched && data.title.error && <div style={{color: 'red'}}>{data.title.error[0]}</div>}
                  </div>
                  <div>
                    <label>Video Description</label>
                    <input type="text" placeholder="Awesome video on our great intern program, check it out!" { ...data.description } />
                    {data.description.touched && data.description.error && <div style={{color: 'red'}}>{data.description.error[0]}</div>}
                  </div>
                  <div>
                    <label>Video URL</label>
                    <input type="text" placeholder="https://www.youtube.com/watch?v=JrHGFIWX2R4" { ...data.url } />
                    {data.url.touched && data.url.error && <div style={{color: 'red'}}>{data.url.error[0]}</div>}
                  </div>
                </div> }
                { (type.value === 'quote') &&
               <div>
                 <div>
                   <label>Quote</label>
                   <input type="text" placeholder="Take care of our peoples families, and they will take care of ours." { ...data.quote } />
                   {data.quote.touched && data.quote.error && <div style={{color: 'red'}}>{data.quote.error[0]}</div>}
                 </div>
                 <div>
                   <label>Quote Author</label>
                   <input type="text" placeholder="Scott Scherr" { ...data.author } />
                   {data.author.touched && data.author.error && <div style={{color: 'red'}}>{data.author.error[0]}</div>}
                 </div>
               </div> }
               { (type.value === 'lunch') &&
              <div>
                <div>
                  <label>Name</label>
                  <input type="text" placeholder="Scott Scherr" { ...data.fullname } />
                  {data.fullname.touched && data.fullname.error && <div style={{color: 'red'}}>{data.fullname.error[0]}</div>}
                </div>
                <div>
                  <label>Position</label>
                  <input type="text" placeholder="CEO" { ...data.position } />
                  {data.position.touched && data.position.error && <div style={{color: 'red'}}>{data.position.error[0]}</div>}
                </div>
              </div> }
              </div>
            </div>
          </div>
        </div>

        <div styleName="flex-space-between">
          <button className="btn waves-effect waves-light" type="button" disabled={ submitting } onClick={ resetForm }>Start Over</button>

          <button className={submitBtnClassName} type="submit" disabled={ submitting }>Add Content</button>
        </div>
      </form>
    </div>
  );
}

ContentForm = CSSModules(ContentForm, ContentPageStyles);

// Composition FTW!
ContentForm = reduxForm({
	form: 'content',
	fields,
  validate
})(ContentForm);

export default ContentForm;
