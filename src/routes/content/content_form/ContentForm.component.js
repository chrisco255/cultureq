import React from 'react';
import { reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import ContentPageStyles from '../ContentPage.css';
import validate from './ContentForm.validation.js';
import TextEditor from '../../../components/text_editor/TextEditor.component';

export const fields = [
  'pillarId',
  'type',
  'data.title',
  'data.description',
  'data.url',
  'data.quote',
  'data.author',
  'data.recipient',
  'data.recipientPosition',
  'data.richtext'
];

// Data Types
const types = [{
  value: 'richtext',
  name: 'Rich Text'
}, {
  value: 'video',
  name: 'Video'
}, {
  value: 'quote',
  name: 'Quote'
}];

let ContentForm = (props) => {
  const {
    fields: {
      pillarId,
      type,
      data
    }, handleSubmit, submitting
  } = props;

  let submitBtnClassName = 'btn waves-effect waves-light accent-background';
  if(submitting || !pillarId.value || !type.value) {
    submitBtnClassName = 'btn waves-effect waves-light disabled';
  }

  // let editorData = '';
  // function onChange(rawState) {
  //   editorData = rawState;
  //   // console.log(editorData);
  //   data.richtext.value = rawState;
  //   // Object.assign({}, data.richtext.value, {
  //   //   entityMap: editorData.entityMap,
  //   //   blocks: editorData.blocks
  //   // });
  //   data.title.value = 'holy moly';
  //   console.log(data.richtext);
  //   console.log(data.title);
  //   // return rawState;
  // }
  // function getEditorData() {
  //   return editorData;
  // }

  console.log(data);

  return (
    <div>
      <h1>Create Content</h1>
      <form onSubmit={handleSubmit}>
        <div className="card">
          <div className="card-content">
            <div>
              <div>
                <div>
                  <label>Choose a Pillar for which this Content pertains to</label>
                  <select className="browser-default" { ...pillarId } >
                    <option value="0" disabled hidden>Choose a Pillar</option>
                    { props.pillars.map( pillar => {
                      if (!pillar.isDeleted) {
                        return (<option key={pillar._id} value={pillar._id}>{pillar.name}</option>);
                      }
                    }) }
                    <option key='noPillar' value='noPillar'>No Pillar Assigned</option>
                  </select>
                </div>
                <div>
                  <label>Content Type</label>
                  <select className="browser-default" { ...type } >
                    <option value="0" disabled hidden>Choose content type</option>
                    { types.map( type => {
                      return (<option key={type.value} value={type.value}>{type.name}</option>);
                    }) }
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
                  <input type="text" placeholder="Scott Scherr" { ...data.recipient } />
                  {data.recipient.touched && data.recipient.error && <div style={{color: 'red'}}>{data.recipient.error[0]}</div>}
                </div>
                <div>
                  <label>Position</label>
                  <input type="text" placeholder="CEO" { ...data.recipientPosition } />
                  {data.recipientPosition.touched && data.recipientPosition.error && <div style={{color: 'red'}}>{data.recipientPosition.error[0]}</div>}
                </div>
              </div> }
              { (type.value === 'richtext') &&
            <TextEditor {...data.richtext} /> }
              </div>
            </div>
          </div>
        </div>

        <div styleName="flex-end">
          <button className={submitBtnClassName} type="submit" disabled={ submitting }>Save Content</button>
        </div>
      </form>
    </div>
  );
};

ContentForm = CSSModules(ContentForm, ContentPageStyles);

// Composition FTW!
ContentForm = reduxForm({
	form: 'content',
	fields,
  validate
})(ContentForm);

export default ContentForm;
