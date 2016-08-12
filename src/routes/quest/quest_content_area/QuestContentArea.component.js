import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import CSSModules from 'react-css-modules';
import QuestContentAreaStyles from './QuestContentArea.css';
import QuestContentItem from '../quest_content_item/QuestContentItem.component';
import QuestContentPlaceholder from '../quest_content_placeholder/QuestContentPlaceholder.component';
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
    const { questContent,
      connectDropTarget,
      removeContent,
      changeContentOrder,
      selectContent,
      deselectContent,
      addContent
    } = this.props;

    const questContentElements = questContent.map((content, index) => {
			return (
				<QuestContentItem
          key={content._id}
          content={content}
          addContent={addContent}
          removeContent={removeContent}
          index={index}
					changeContentOrder={changeContentOrder}
          selectContent={selectContent}
          deselectContent={deselectContent} />
			);
		});

    let questContentElement = (
      <ReactCSSTransitionGroup component="div"
                                styleName="quest-content-items"
                                transitionName="quest-content-item-transition"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={500}>
        {questContentElements}
        <QuestContentPlaceholder text="Add a card"/>
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
          {questContentActions}
          {questContentElement}
        </div>
      )
    );
	}

}

QuestContentArea = CSSModules(QuestContentArea, QuestContentAreaStyles);
export default DropTarget(POOL_CONTENT_ITEM, spec, collect)(QuestContentArea);
