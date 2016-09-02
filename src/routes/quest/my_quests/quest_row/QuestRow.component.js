import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './QuestRow.css';
import TimeAgo from 'react-timeago';

class QuestRow extends Component {

	render() {
    const { quest } = this.props;

    return (
      <div styleName="content-row">
        <div styleName="quest-info">
          <div styleName="title">{quest.title}</div>
          <div styleName="description">{quest.description}</div>
          <div styleName="pillar-container">
            Pillar:<br />
            <div styleName="pillar">{quest.pillar}</div>
          </div>
        </div>
        <div styleName="quest-card-count">{quest.content.length} {quest.content.length === 1 ? 'card' : 'cards'}</div>
        <div styleName="quest-modified-time"><TimeAgo date={new Date(quest.lastModified)} /></div>
      </div>
    );
	}
}

QuestRow.propTypes = {
  quest: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pillar: PropTypes.string.isRequired,
    content: PropTypes.arrayOf(PropTypes.object).isRequired
  }).isRequired
};

QuestRow = CSSModules(QuestRow, styles);
export default QuestRow;
