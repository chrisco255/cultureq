import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.css';
import _ from 'lodash';

class Quote extends Component {

  onQuoteEditSubmit = (event) => {
    event.preventDefault();
    console.log(this.refs.contentThatIsBeingEditedInput.value);
  }

  render() {
    const { key, data, content, index, pillarName, deleteContent, editContent, isEditing, contentThatIsBeingEdited, contentThatIsBeingEditedIndex } = this.props;

    const quoteIcon = {
      fontSize: '-webkit-xxx-large'
    };

    const iconContainer = {
      display: 'flex',
      justifyContent: 'flex-end'
    };

    const quoteText = {
      marginTop: 0
    };

    const quoteContainer = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginLeft: '40px',
      marginRight: '40px'
    };

    if(isEditing && index === contentThatIsBeingEditedIndex) {
      return (
        <div className="card blue-grey darken-1" key={key}>
          <div className="card-content white-text">
            <div styleName="pillar-badge">EDITING</div>
            <form>
              <div className="input-field">
                <input ref="contentThatIsBeingEditedInput" id="quote" defaultValue={data.quote} type="text" className="validate" onBlur={this.onQuoteEditSubmit} />
                <label for="quote">Quote</label>
              </div>
            </form>
          </div>
          <div className="card-action" styleName="flex-space-between">
            <a className="hand" onClick={editContent.bind(this, content, index)}>DONE</a>
          </div>
        </div>
      );
    }

    return (
      <div className="card blue-grey darken-1" key={key}>
        <div className="card-content white-text">
          <div styleName="pillar-badge">{pillarName}</div>
          <div style={iconContainer}>
            <i className="material-icons" style={quoteIcon}>format_quote</i>
          </div>
          <div style={quoteContainer}>
            <h4 style={quoteText}><em>{data.quote}</em></h4>
            <p>- {data.author}</p>
          </div>
        </div>
        <div className="card-action" styleName="flex-space-between">
          <a className="hand" onClick={editContent.bind(this, content, index)}>Edit</a>
          <a className="hand" onClick={deleteContent.bind(this, content)}><i className="material-icons">delete</i></a>
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
  contentThatIsBeingEditedIndex: PropTypes.number
};

Quote = CSSModules(Quote, styles);
export default Quote;
