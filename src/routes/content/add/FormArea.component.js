import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from '../ContentPage.css';
import ContentTypes from '../ContentTypes';
import VideoForm from '../video_form/VideoForm.component';
import QuoteForm from '../quote_form/QuoteForm.component';
import TextEditorForm from './TextEditorForm.component';

class FormArea extends Component {

  onContentSubmit = (values) => {
    values.type = this.props.currentContentType;
		this.props.createContent(values);
	}

  render() {

    const { currentContentType, pillars, createContent } = this.props;

    return (
      <div style={{width: '60%', paddingTop: '2.1rem'}}>
        <div style={{margin: '0px 10% 0px 10%'}}>
          { (currentContentType === ContentTypes.VIDEO) && <VideoForm onSubmit={this.onContentSubmit} pillars={pillars} type={currentContentType} /> }
          { (currentContentType === ContentTypes.QUOTE) && <QuoteForm onSubmit={this.onContentSubmit} pillars={pillars} type={currentContentType} /> }
          { (currentContentType === ContentTypes.RICHTEXT) && <TextEditorForm createContent={createContent} />}
        </div>
      </div>
    );
  }
}

FormArea.propTypes = {
  currentContentType: PropTypes.string,
  pillars: PropTypes.array,
  createContent: PropTypes.func
};

FormArea = CSSModules(FormArea, styles);
export default FormArea;
