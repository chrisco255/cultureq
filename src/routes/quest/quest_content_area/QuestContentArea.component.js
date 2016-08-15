import React, { Component } from 'react';
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
    const { questContent, connectDropTarget, removeContent, changeContentOrder, selectContent, deselectContent } = this.props;

    const questContentElements = questContent.map((content, index) => {
			return (
				<QuestContentItem
          key={content._id}
          content={content}
          removeContent={removeContent}
          index={index}
					changeContentOrder={changeContentOrder}
          selectContent={selectContent}
          deselectContent={deselectContent} />
			);
		});

    // let noItemsMessage = null;
    // if (questContentElements.length === 0) {
    //   noItemsMessage = <div styleName="no-items-message">Please add a card</div>;
    // }
    //TODO use a JS based animation library to make it so the last removed
    //element does not just dissapear - it should animate out instead
    //temporary half-fix
    const questContentStyles = {};
    if (questContentElements.length === 0) {
      questContentStyles.display = 'none';
    }
    let questContentElement = (
      <ReactCSSTransitionGroup component="div"
                                style={questContentStyles}
                                styleName="quest-content-items"
                                transitionName="quest-content-item-transition"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
        {questContentElements}
      </ReactCSSTransitionGroup>
    );

    let questContentActions = null;
    const selectedQuestContent = questContent.filter((content) => {
      return content.isSelected;
    });
    if (questContentElements.length > 0) {
      const removeAllContent = () => {
        selectedQuestContent.map((content) => {
          removeContent(content);
        });
      };
      const styles = {};
      if (selectedQuestContent.length === 0) {
        styles.visibility = 'hidden';
      }
      questContentActions = (
        <div styleName="content-actions" style={styles}>
          <a
            className="waves-effect waves-default btn-flat"
            styleName="action"
            onClick={removeAllContent}>Remove Selected</a>
        </div>
      );
    }

    return (
      connectDropTarget(
        <div styleName="quest-content-container">
          {/* {noItemsMessage} */}
          {questContentActions}
          {questContentElement}
        </div>
      )
    );
	}

}

QuestContentArea = CSSModules(QuestContentArea, QuestContentAreaStyles);
export default DropTarget(POOL_CONTENT_ITEM, spec, collect)(QuestContentArea);
