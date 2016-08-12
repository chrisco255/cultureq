import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './QuestContentPlaceholder.css';

class QuestContentPlaceholder extends Component {

	render() {
    const {
			text
		} = this.props;

    return (
      <div styleName="quest-content-placeholder">
        <div styleName="placeholder-content">
          <i styleName="icon" className="material-icons">add</i>
          <div styleName="text">{text}</div>
        </div>
      </div>
    );
	}
}

QuestContentPlaceholder.propTypes = {
  text: PropTypes.string.isRequired
};

QuestContentPlaceholder = CSSModules(QuestContentPlaceholder, styles);
export default QuestContentPlaceholder;
