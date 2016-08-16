import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import CSSModules from 'react-css-modules';
import ContentPageStyles from '../ContentPage.css';
import validate from './VideoForm.validation';

export const fields = [
  'pillarId',
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
        data
      }, handleSubmit, submitting
    } = this.props;

    let submitBtnClassName = 'btn-floating btn-large waves-effect waves-light green';
    if(submitting || !data.title.value || !data.description.value || !data.url.value) {
      submitBtnClassName = 'btn-floating btn-large disabled';
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

VideoForm = CSSModules(VideoForm, ContentPageStyles);

// Composition FTW!
VideoForm = reduxForm({
	form: 'video',
	fields,
  validate
})(VideoForm);

export default VideoForm;
