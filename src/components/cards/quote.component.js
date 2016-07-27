import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.css';
import _ from 'lodash';

class Quote extends Component {
  render() {
    let { key, data, content, index, pillarName, deleteContent } = this.props;

    var quoteIcon = {
      fontSize: '-webkit-xxx-large'
    };

    var iconContainer = {
      display: 'flex',
      justifyContent: 'flex-end'
    }

    var quoteText = {
      marginTop: 0
    }

    var quoteContainer = {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      marginLeft: '40px',
      marginRight: '40px'
    }

    var pillarBadge = {
      borderRadius: '2px',
      backgroundColor: '#f06292',
      color: 'white',
      fontWeight: 300,
      fontSize: '0.8rem',
      minWidth: '3rem',
      padding: '0 6px',
      textAlign: 'center',
      fontSize: '1rem',
      lineHeight: 'inherit',
      boxSizing: 'border-box'
    }

    return (
      <div className="card blue-grey darken-1" key={key}>
        <div className="card-content white-text">
          <div style={pillarBadge}>{pillarName}</div>
          <div style={iconContainer}>
            <i className="material-icons" style={quoteIcon}>format_quote</i>
          </div>
          <div style={quoteContainer}>
            <h4 style={quoteText}><em>{data.quote}</em></h4>
            <p>- {data.author}</p>
          </div>
        </div>
        <div className="card-action" styleName="flex-space-between">
          <a className="hand">Edit</a>
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
  deleteContent: PropTypes.func
}

Quote = CSSModules(Quote, styles);
export default Quote;
