import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './QuestContentEndPlaceholder.css';

class QuestContentEndPlaceholder extends Component {

	render() {
    const {
			text
		} = this.props;

    return (
      <div styleName="quest-content-end-placeholder">
        <div styleName="placeholder-content">
          <i styleName="icon" className="material-icons">add</i>
          <div styleName="text">{text}</div>
        </div>
      </div>
    );
	}
}

QuestContentEndPlaceholder.propTypes = {
  text: PropTypes.string.isRequired
};

QuestContentEndPlaceholder = CSSModules(QuestContentEndPlaceholder, styles);
export default QuestContentEndPlaceholder;
