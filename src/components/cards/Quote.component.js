import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Card.component.css';
import QuestContentItemStyles from '../../routes/quest/quest_content_item/QuestContentItem.css';

class Quote extends Component {

  onQuoteEditSubmit = (event) => {
    event.preventDefault();
    this.props.quoteChangeContent(this.refs.quoteThatIsBeingEditedInput.value, this.props.contentThatIsBeingEdited._id);
  }

  onAuthorEditSubmit = (event) => {
    event.preventDefault();
    this.props.authorChangeContent(this.refs.authorThatIsBeingEditedInput.value, this.props.contentThatIsBeingEdited._id);
  }

  render() {
    const { content, deleteContent, editContent, isEditing, finishEdit, pillarName, contentThatIsBeingEdited } = this.props;
    const { _id, data } = content;
    const { quote, author } = data;

    if(isEditing && _id === contentThatIsBeingEdited._id) {
      return (
        <div className="card" key={_id} style={QuestContentItemStyles} styleName="quest-content-item">
          <div className="card-content" styleName="card-content">
          <form>
            <div className="input-field">
              <input ref="quoteThatIsBeingEditedInput" id="quote" defaultValue={quote} type="text" className="validate" onBlur={this.onQuoteEditSubmit} />
              <label htmlFor="quote" className="active">Quote</label>
            </div>
            <div className="input-field">
              <input ref="authorThatIsBeingEditedInput" id="author" defaultValue={author} type="text" className="validate" onBlur={this.onAuthorEditSubmit} />
              <label htmlFor="author" className="active">Author</label>
            </div>
          </form>
          </div>
          <div styleName="buttons">
            <a className="waves-effect waves-default btn-flat right" styleName="button" onClick={finishEdit.bind(this)}>done</a>
          </div>
        </div>
      );
    }

    let contentPaddingTop = {};
    if (pillarName !== 'noPillar') {
      contentPaddingTop.paddingTop = '10px';
    } else {
      delete contentPaddingTop.paddingTop;
    }

    return (
      <div className="card" key={_id} style={QuestContentItemStyles} styleName="quest-content-item">
        { pillarName !== 'noPillar' && <div className="accent-background white-text" style={{textAlign: 'center'}}>{pillarName}</div>}
        <div className="card-content" styleName="card-content" style={contentPaddingTop}>
          {/*<div className="card-title" styleName="card-title">Content #{index + 1}</div>*/}
           <div style={{display: 'flex', justifyContent: 'flex-end'}}>
             <i className="material-icons" style={{fontSize: '-webkit-xxx-large'}}>format_quote</i>
           </div>
          <div>
            <div styleName="card-description">{data.quote}</div>
            <p style={{textAlign: 'right'}} className="accent-text"><em>- {data.author}</em></p>
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

Quote.propTypes = {
  content: PropTypes.object,
  pillarName: PropTypes.string,
  deleteContent: PropTypes.func,
  editContent: PropTypes.func,
  isEditing: PropTypes.bool,
  contentThatIsBeingEdited: PropTypes.object,
  finishEdit: PropTypes.func,
  authorChangeContent: PropTypes.func,
  quoteChangeContent: PropTypes.func
};

Quote = CSSModules(Quote, QuestContentItemStyles);
export default Quote;
