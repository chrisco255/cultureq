import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './card.component.css';
import QuestContentItemStyles from '../../routes/quest/quest_content_item/QuestContentItem.css';

class Action extends Component {
  render() {
    const { key, data, content, index, pillarName, deleteContent } = this.props;

    return (
      <div className="card blue-grey darken-1" key={key}>
        <div className="card-content white-text">
          <span className="card-title">Content #{index + 1}</span>
          <p>Linked to Pillar: {pillarName}</p>
          <p>You will be having lunch with {data.recipient}, the {data.recipientPosition}!</p>
        </div>
        <div className="card-action" styleName="flex-space-between">
          <a className="hand">Edit</a>
          <a className="hand" onClick={deleteContent.bind(this, content)}><i className="material-icons">delete</i></a>
        </div>
      </div>
    );
  }
}

Action.propTypes = {
  key: PropTypes.string,
  data: PropTypes.object,
  content: PropTypes.object,
  index: PropTypes.number,
  pillarName: PropTypes.string,
  deleteContent: PropTypes.func
};

Action = CSSModules(Action, styles);
export default Action;
