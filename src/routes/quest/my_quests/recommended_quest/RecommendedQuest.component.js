import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './RecommendedQuest.css';
import TimeFormat from '../../../../components/time_format/TimeFormat.component';

class RecommendedQuest extends Component {

	render() {
    const { quest } = this.props;

    return (
      <div styleName="recommended-quest">
        <div styleName="pillar">{quest.pillar}</div>
        <div styleName="quest-title">{quest.title}</div>
        <div styleName="description">{quest.description}</div>
        <div styleName="time">
          <span className="material-icons" styleName="icon">access_time</span>
          <TimeFormat seconds={quest.time} />
        </div>
      </div>
    );
	}
}

RecommendedQuest.propTypes = {
  quest: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    pillar: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired
  }).isRequired
};

RecommendedQuest = CSSModules(RecommendedQuest, styles);
export default RecommendedQuest;
