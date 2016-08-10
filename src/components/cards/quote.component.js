import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.css';
import QuestContentItemStyles from '../../routes/quest/quest_content_item/QuestContentItem.css';

class Quote extends Component {

  onQuoteEditSubmit = (event) => {
    event.preventDefault();
    this.props.quoteChangeContent(this.refs.quoteThatIsBeingEditedInput.value, this.props.contentThatIsBeingEditedIndex);
  }

  onAuthorEditSubmit = (event) => {
    event.preventDefault();
    this.props.authorChangeContent(this.refs.authorThatIsBeingEditedInput.value, this.props.contentThatIsBeingEditedIndex);
  }

  render() {
    const { key, data, content, index, deleteContent, editContent, isEditing, contentThatIsBeingEditedIndex, finishEdit } = this.props;

    if(isEditing && index === contentThatIsBeingEditedIndex) {
      return (
        <div className="card" key={key} style={QuestContentItemStyles} styleName="quest-content-item">
          <div className="card-content" styleName="card-content">
          <form>
            <div className="input-field">
              <input ref="quoteThatIsBeingEditedInput" id="quote" defaultValue={data.quote} type="text" className="validate" onBlur={this.onQuoteEditSubmit} />
              <label htmlFor="quote" className="active">Quote</label>
            </div>
            <div className="input-field">
              <input ref="authorThatIsBeingEditedInput" id="author" defaultValue={data.author} type="text" className="validate" onBlur={this.onAuthorEditSubmit} />
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

    return (
      <div className="card" key={key} style={QuestContentItemStyles} styleName="quest-content-item">
        <div className="card-content" styleName="card-content">
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
          <a className="waves-effect waves-default btn-flat" styleName="button" onClick={editContent.bind(this, content, index)}>edit</a>
          <a className="waves-effect waves-default btn-flat" styleName="button" onClick={deleteContent.bind(this, content)}>remove</a>
        </div>
      </div>
    );
  }
}

Quote.propTypes = {
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
  finishEdit: PropTypes.func,
  authorChangeContent: PropTypes.func,
  quoteChangeContent: PropTypes.func
};

Quote = CSSModules(Quote, QuestContentItemStyles);
export default Quote;
