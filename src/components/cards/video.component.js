import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.css';
import _ from 'lodash';

class Video extends Component {
  render() {
    let { key, data, content, index, pillarName, deleteContent } = this.props;

    return (
      <div className="card blue-grey darken-1" key={key}>
        <div className="card-content white-text">
          <span className="card-title">Content #{index + 1}</span>
          <p>Linked to Pillar: {pillarName}</p>
          <p>Title: {data.title}</p>
          <p>Description: {data.description}</p>
          <p>URL: {data.url}</p>
        </div>
        <div className="card-action" styleName="flex-space-between">
          <a className="hand">Edit</a>
          <a className="hand" onClick={deleteContent.bind(this, content)}><i className="material-icons">delete</i></a>
        </div>
      </div>
    );
  }
}

Video.propTypes = {
  key: PropTypes.string,
  data: PropTypes.object,
  content: PropTypes.object,
  index: PropTypes.number,
  pillarName: PropTypes.string,
  deleteContent: PropTypes.func
}

Video = CSSModules(Video, styles);
export default Video;
