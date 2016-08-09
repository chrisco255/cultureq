import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import CSSModules from 'react-css-modules';
import QuestContentAreaStyles from './QuestContentArea.css';
import QuestContentItem from '../quest_content_item/QuestContentItem.component';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
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

    let noItemsMessage = null;
    if (questContentElements.length === 0) {
      noItemsMessage = <div styleName="no-items-message">Please add a card</div>;
    }
    let questContentElement = (
      <ReactCSSTransitionGroup component="div"
                                styleName="quest-content"
                                transitionName="quest-content-item-transition"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
        {questContentElements}
      </ReactCSSTransitionGroup>
    );

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
