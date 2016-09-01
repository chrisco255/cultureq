import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './TrendingSurvey.css';
import ArrowUp from '../../../../assets/images/arrow-up-green.svg';
import ArrowDown from '../../../../assets/images/arrow-down-red.svg';

class TrendingSurvey extends Component {

	render() {
    const { survey } = this.props;

    let arrow;
    let formattedChange;
    if (survey.change >= 0) {
        arrow = <img src={ArrowUp} />;
        formattedChange = <div styleName="change-up">{`+${survey.change}%`}</div>;
    } else if (survey.change < 0){
      arrow = <img src={ArrowDown} />;
      formattedChange = <div styleName="change-down">{`-${Math.abs(survey.change)}%`}</div>;
    }

    return (
      <div styleName="trending-survey">
        {arrow}
        <div styleName="survey-title">{survey.title}</div>
        {formattedChange}
      </div>
    );
	}
}

TrendingSurvey.propTypes = {
  survey: PropTypes.shape({
    change: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

TrendingSurvey = CSSModules(TrendingSurvey, styles);
export default TrendingSurvey;
