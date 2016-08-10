import React, { PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './Card.component.css';

let AnalyticCard = (props) => {
  const { isGood, isPercentage, title, value, valueChange, valueOutOf, valueUnits, } = props;
  const isPositive = (valueChange >= 0);

  return (
    <div className="card" styleName="card">
      <div styleName="card-content">
        <span styleName="title">{title}</span>
        <div styleName="change-value" className="black-text">
          <span styleName="value">{value}{isPercentage ? '%' : null}</span>
          <div styleName="value-units" className="gray-text">
            <span> {valueUnits}</span>
            {valueOutOf && <span>/{valueOutOf}</span> }
          </div>
        </div>
        <div styleName={isGood ? 'change change-good' : 'change change-bad'}>
          <span>{isPositive ? '+' : ''}</span>
          <span>{valueChange}{isPercentage ? '%' : null}</span>
          <i className="material-icons">{isPositive ? 'arrow_drop_up' : 'arrow_drop_down'}</i>
        </div>
      </div>
    </div>
  );
};

AnalyticCard.propTypes = {
  isGood: PropTypes.bool.isRequired,
  isPercentage: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  valueChange: PropTypes.number.isRequired,
  valueOutOf: PropTypes.number,
  valueUnits: PropTypes.string,
};

AnalyticCard = CSSModules(AnalyticCard, styles, { allowMultiple: true });
export default AnalyticCard;
