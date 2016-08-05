import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DropTarget } from 'react-dnd';
import CSSModules from 'react-css-modules';
import QuestContentAreaStyles from './QuestContentArea.css';
import QuestContentItem from '../quest_content_item/QuestContentItem.component';
import { POOL_CONTENT_ITEM, QUEST_CONTENT_AREA } from '../ItemTypes';

const spec = {
  drop(props, monitor, component) {
    console.log(`Component ${component} dropped into the quest content area`);
    return {type: QUEST_CONTENT_AREA};
  }
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
};

class QuestContentArea extends Component {

	render() {
    const { questContent, connectDropTarget, removeContent, changeContentOrder } = this.props;

    const questContentElements = questContent.map((content, index) => {
			return (
				<QuestContentItem
          key={content._id}
          content={content}
          removeContent={removeContent}
          index={index}
					changeContentOrder={changeContentOrder} />
			);
		});

    let questContentElement = null;
    let noItemsMessage = null;
    if (questContentElements.length === 0) {
      noItemsMessage = <div styleName="no-items-message">Please add a card</div>;
    } else {
      questContentElement = (
        <div styleName="quest-content">
          {questContentElements}
        </div>
      );
    }

    return (
      connectDropTarget(
        <div styleName="quest-content-container">
          {noItemsMessage}
          {questContentElement}
        </div>
      )
    );
	}

}

QuestContentArea = CSSModules(QuestContentArea, QuestContentAreaStyles);
export default DropTarget(POOL_CONTENT_ITEM, spec, collect)(QuestContentArea);
