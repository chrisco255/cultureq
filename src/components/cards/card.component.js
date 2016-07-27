import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.css';
import _ from 'lodash';

// const mapStateToProps = (state) => {
//   return {
//     content: state.content,
//     pillars: state.pillars
//   }
// }

class Card extends Component {
  //...

  render() {
    let { content, index, pillars, deleteContent, key } = this.props;

    console.log('CONTENT', content);
    console.log('PILLARS', pillars);

    return (
      <div className="card blue-grey darken-1" key={key}>
        <div className="card-content white-text">
          <span className="card-title">Content #{index + 1}</span>
          <p>Linked to Pillar: {pillars[_.findIndex(pillars, (pillar) => pillar._id === content.pillarId)].name}</p>
          {content.type === 'QUOTE' &&
          <div>
            <p>Quote: {content.data.quote}</p>
            <p>Author: {content.data.author}</p>
          </div>}
          {content.type === 'VIDEO' &&
          <div>
            <p>Title: {content.data.title}</p>
            <p>Description: {content.data.description}</p>
            <p>URL: {content.data.url}</p>
          </div>}
          {content.type === 'LUNCH' &&
          <div>
            <p>Recipient: {content.data.recipient}</p>
            <p>Position: {content.data.recipientPosition}</p>
          </div>}
        </div>
        <div className="card-action" styleName="flex-space-between">
          <a className="hand">Edit</a>
          <a className="hand" onClick={deleteContent.bind(this, content)}><i className="material-icons">delete</i></a>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  key: PropTypes.string,
  content: PropTypes.object,
  index: PropTypes.number,
  pillars: PropTypes.array,
  deleteContent: PropTypes.func
}

Card = CSSModules(Card, styles);
export default Card;
