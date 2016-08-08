import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.css';

class Video extends Component {

  onTitleEditSubmit = (event) => {
    event.preventDefault();
    console.log(this.refs.titleThatIsBeingEditedInput.value);
    this.props.titleChangeContent(this.refs.titleThatIsBeingEditedInput.value, this.props.contentThatIsBeingEditedIndex);
  }

  onDescriptionEditSubmit = (event) => {
    event.preventDefault();
    console.log(this.refs.descriptionThatIsBeingEditedInput.value);
    this.props.descriptionChangeContent(this.refs.descriptionThatIsBeingEditedInput.value, this.props.contentThatIsBeingEditedIndex);
  }

  onUrlEditSubmit = (event) => {
    event.preventDefault();
    console.log(this.refs.urlThatIsBeingEditedInput.value);
    this.props.urlChangeContent(this.refs.urlThatIsBeingEditedInput.value, this.props.contentThatIsBeingEditedIndex);
  }

  render() {
    const { key, index, data, content, pillarName, deleteContent, editContent, isEditing, contentThatIsBeingEdited, contentThatIsBeingEditedIndex, titleChangeContent, descriptionChangeContent, urlChangeContent, finishEdit } = this.props;
    let urlEmbeddedLink = `https://www.youtube.com/embed/${data.url.split('=')[1]}`;

    if(isEditing && index === contentThatIsBeingEditedIndex) {
      return (
        <div className="card blue-grey darken-1" key={key}>
          <div className="card-content white-text">
            <form>
              <div className="row">
                <div className="input-field">
                  <input ref="titleThatIsBeingEditedInput" id="title" defaultValue={data.title} type="text" className="validate" onBlur={this.onTitleEditSubmit} />
                  <label htmlFor="title" className="active">Title</label>
                </div>
                <div className="input-field">
                  <input ref="descriptionThatIsBeingEditedInput" id="description" defaultValue={data.description} type="text" className="validate" onBlur={this.onDescriptionEditSubmit} />
                  <label htmlFor="description" className="active">Description</label>
                </div>
                <div className="input-field">
                  <input ref="urlThatIsBeingEditedInput" id="url" defaultValue={data.url} type="text" className="validate" onBlur={this.onUrlEditSubmit} />
                  <label htmlFor="url" className="active">URL</label>
                </div>
              </div>
            </form>
          </div>
          <div className="card-action" styleName="flex-space-between">
            <a className="hand" onClick={finishEdit.bind(this)}>DONE</a>
          </div>
        </div>
      );
    }

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
          <a className="hand" onClick={editContent.bind(this, content, index)}>Edit</a>
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
  deleteContent: PropTypes.func,
  editContent: PropTypes.func,
  isEditing: PropTypes.bool,
  contentThatIsBeingEdited: PropTypes.object,
  contentThatIsBeingEditedIndex: PropTypes.number,
  titleChangeContent: PropTypes.func,
  descriptionChangeContent: PropTypes.func,
  urlChangeContent: PropTypes.func,
  finishEdit: PropTypes.func
};

Video = CSSModules(Video, styles);
export default Video;
