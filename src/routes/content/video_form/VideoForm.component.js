import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import ContentPageStyles from '../ContentPage.css';
import validate from './VideoForm.validation.js';

export const fields = [
  'pillarId',
  'type',
  'data.title',
  'data.description',
  'data.url'
];

class VideoForm extends Component {

componentDidMount() {
  $( "#title" ).focus();
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
    if(submitting || !pillarId.value || !data.title || !data.description || !data.url) {
      submitBtnClassName = 'btn waves-effect waves-light disabled';
    }

    return (
      <div>
        <h1>Create Video Content</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>

              <div>
                <div>
                  <label>Title</label>
                  <input id="title" type="text" placeholder="Ultimate Software TechStars" { ...data.title } />
                  {data.title.touched && data.title.error && <div style={{color: 'red'}}>{data.title.error[0]}</div>}
                </div>
                <div>
                  <label>Description</label>
                  <input type="text" placeholder="Awesome video on our great intern program, check it out!" { ...data.description } />
                  {data.description.touched && data.description.error && <div style={{color: 'red'}}>{data.description.error[0]}</div>}
                </div>
                <div>
                  <label>URL</label>
                  <input type="text" placeholder="https://www.youtube.com/watch?v=JrHGFIWX2R4" { ...data.url } />
                  {data.url.touched && data.url.error && <div style={{color: 'red'}}>{data.url.error[0]}</div>}
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
VideoForm = CSSModules(VideoForm, ContentPageStyles);

// Composition FTW!
VideoForm = reduxForm({
	form: 'video_content',
	fields,
  validate
})(VideoForm);

export default VideoForm;
