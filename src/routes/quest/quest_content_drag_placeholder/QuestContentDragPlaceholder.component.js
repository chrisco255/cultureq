import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
import styles from './QuestContentDragPlaceholder.css';

class QuestContentDragPlaceholder extends Component {

	render() {

    return (
      <div styleName="quest-content-drag-placeholder">
      </div>
    );
	}
}

QuestContentDragPlaceholder = CSSModules(QuestContentDragPlaceholder, styles);
export default QuestContentDragPlaceholder;
