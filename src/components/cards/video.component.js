import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.css';
import QuestContentItemStyles from '../../routes/quest/quest_content_item/QuestContentItem.css';

class Video extends Component {

  onTitleEditSubmit = (event) => {
    event.preventDefault();
    this.props.titleChangeContent(this.refs.titleThatIsBeingEditedInput.value, this.props.contentThatIsBeingEditedIndex);
  }

  onDescriptionEditSubmit = (event) => {
    event.preventDefault();
    this.props.descriptionChangeContent(this.refs.descriptionThatIsBeingEditedInput.value, this.props.contentThatIsBeingEditedIndex);
  }

  onUrlEditSubmit = (event) => {
    event.preventDefault();
    this.props.urlChangeContent(this.refs.urlThatIsBeingEditedInput.value, this.props.contentThatIsBeingEditedIndex);
  }

  render() {
    const { key, index, data, content, deleteContent, editContent, isEditing, contentThatIsBeingEditedIndex, finishEdit } = this.props;
    let urlEmbeddedLink = `https://www.youtube.com/embed/${data.url.split('=')[1]}`;

    if(isEditing && index === contentThatIsBeingEditedIndex) {
      return (
        <div className="card" key={key} style={QuestContentItemStyles} styleName="quest-content-item-video">
          <div className="card-content" styleName="card-content">
            <form>
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
            </form>
          </div>
          <div styleName="buttons">
            <a className="waves-effect waves-default btn-flat right" styleName="button" onClick={finishEdit.bind(this)}>done</a>
          </div>
        </div>
      );
    }

    return (
      <div className="card" key={key} style={QuestContentItemStyles} styleName="quest-content-item-video">
        <div className="card-content" styleName="card-content" style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          {/*<div className="card-title" styleName="card-title">Content #{index + 1}</div>*/}
          <div><iframe style={{border: 'solid #BDBDBD 2px', width: '260px'}} src={urlEmbeddedLink}></iframe></div>
          <div>
            <p className="accent-text">{data.title}</p>
            <div styleName="card-description">{data.description}</div>
          </div>
        </div>
        <div styleName="buttons">
          <a className="waves-effect waves-default btn-flat" styleName="button" onClick={editContent.bind(this, content, index)}>edit</a>
          <a className="waves-effect waves-default btn-flat" styleName="button" onClick={deleteContent.bind(this, content)}>remove</a>
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

Video = CSSModules(Video, QuestContentItemStyles);
export default Video;
