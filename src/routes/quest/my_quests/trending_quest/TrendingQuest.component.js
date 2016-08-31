import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './TrendingQuest.css';
import ArrowUp from '../../../../assets/images/arrow-up-green.svg';
import ArrowDown from '../../../../assets/images/arrow-down-red.svg';

class TrendingQuest extends Component {

	render() {
    const { quest } = this.props;

    let arrow;
    let formattedChange;
    if (quest.change >= 0) {
        arrow = <img src={ArrowUp} />;
        formattedChange = <div styleName="change-up">{`+${quest.change}%`}</div>;
    } else if (quest.change < 0){
      arrow = <img src={ArrowDown} />;
      formattedChange = <div styleName="change-down">{`-${Math.abs(quest.change)}%`}</div>;
    }

    return (
      <div styleName="trending-quest">
        {arrow}
        <div styleName="quest-title">{quest.title}</div>
        {formattedChange}
      </div>
    );
	}
}

TrendingQuest.propTypes = {
  quest: PropTypes.shape({
    change: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

TrendingQuest = CSSModules(TrendingQuest, styles);
export default TrendingQuest;
