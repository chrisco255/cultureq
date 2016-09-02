import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import QuestContentItemStyles from '../../routes/quest/quest_content_item/QuestContentItem.css';

class Video extends Component {

  onTitleEditSubmit = (event) => {
    event.preventDefault();
    this.props.titleChangeContent(this.refs.titleThatIsBeingEditedInput.value, this.props.contentThatIsBeingEdited._id);
  }

  onDescriptionEditSubmit = (event) => {
    event.preventDefault();
    this.props.descriptionChangeContent(this.refs.descriptionThatIsBeingEditedInput.value, this.props.contentThatIsBeingEdited._id);
  }

  onUrlEditSubmit = (event) => {
    event.preventDefault();
    this.props.urlChangeContent(this.refs.urlThatIsBeingEditedInput.value, this.props.contentThatIsBeingEdited._id);
  }

  render() {
    const { content, deleteContent, editContent, isEditing, finishEdit, pillarName, contentThatIsBeingEdited } = this.props;
    const { _id, data } = content;
    const { title, description, url } = data;
    let urlEmbeddedLink = `https://www.youtube.com/embed/${url.split('=')[1]}`;

    if(isEditing && _id === contentThatIsBeingEdited._id) {
      return (
        <div className="card" key={_id} style={QuestContentItemStyles} styleName="quest-content-item-video">
          <div className="card-content" styleName="card-content">
            <form>
              <div className="input-field">
                <input ref="titleThatIsBeingEditedInput" id="title" defaultValue={title} type="text" className="validate" onBlur={this.onTitleEditSubmit} />
                <label htmlFor="title" className="active">Title</label>
              </div>
              <div className="input-field">
                <input ref="descriptionThatIsBeingEditedInput" id="description" defaultValue={description} type="text" className="validate" onBlur={this.onDescriptionEditSubmit} />
                <label htmlFor="description" className="active">Description</label>
              </div>
              <div className="input-field">
                <input ref="urlThatIsBeingEditedInput" id="url" defaultValue={url} type="text" className="validate" onBlur={this.onUrlEditSubmit} />
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

    let contentAlignment = {
      display: 'flex',
      flexDirection: 'column'
    };
    if(pillarName !== 'noPillar') {
      contentAlignment.paddingTop = '10px';
    } else {
      delete contentAlignment.paddingTop;
    }

    return (
      <div className="card" key={_id} style={QuestContentItemStyles} styleName="quest-content-item-video">
        { pillarName !== 'noPillar' && <div className="accent-background white-text" style={{textAlign: 'center'}}>{pillarName}</div>}
        <div className="card-content" styleName="card-content" style={contentAlignment}>
          <div><iframe style={{border: 'solid #BDBDBD 2px', width: '260px'}} src={urlEmbeddedLink}></iframe></div>
          <div>
            <p className="accent-text">{title}</p>
            <div styleName="card-description">{description}</div>
          </div>
        </div>
        <div styleName="buttons">
          <a className="waves-effect waves-default btn-flat" styleName="button" onClick={editContent.bind(this, content)}>edit</a>
          <a className="waves-effect waves-default btn-flat" styleName="button" onClick={deleteContent.bind(this, content)}>remove</a>
        </div>
      </div>
    );
  }
}

Video.propTypes = {
  content: PropTypes.object,
  pillarName: PropTypes.string,
  deleteContent: PropTypes.func,
  editContent: PropTypes.func,
  isEditing: PropTypes.bool,
  contentThatIsBeingEdited: PropTypes.object,
  titleChangeContent: PropTypes.func,
  descriptionChangeContent: PropTypes.func,
  urlChangeContent: PropTypes.func,
  finishEdit: PropTypes.func
};

Video = CSSModules(Video, QuestContentItemStyles);
export default Video;
