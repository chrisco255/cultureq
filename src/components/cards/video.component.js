import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.css';

class Video extends Component {
  render() {
    const { key, data, content, pillarName, deleteContent } = this.props;

    let urlEmbeddedLink = `https://www.youtube.com/embed/${data.url.split('=')[1]}`;

    return (
      <div className="card blue-grey darken-1" key={key}>
        <div className="card-content white-text">
          <div styleName="pillar-badge">{pillarName}</div>
          <span className="card-title">{data.title}</span>
          <div>
            <iframe src={urlEmbeddedLink}></iframe>
          </div>
          <p>{data.description}</p>

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
};

Video = CSSModules(Video, styles);
export default Video;
