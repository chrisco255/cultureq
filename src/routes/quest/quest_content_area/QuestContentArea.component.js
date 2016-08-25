import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import CSSModules from 'react-css-modules';
import QuestContentAreaStyles from './QuestContentArea.css';
import QuestContentItem from '../quest_content_item/QuestContentItem.component';
import QuestContentEndPlaceholder from '../quest_content_end_placeholder/QuestContentEndPlaceholder.component';
import QuestContentDragPlaceholder from '../quest_content_drag_placeholder/QuestContentDragPlaceholder.component';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { POOL_CONTENT_ITEM, QUEST_CONTENT_ITEM, QUEST_CONTENT_AREA } from '../ItemTypes';
import {
	immutablyAddElementToArray,
	immutablyRemoveIndexFromArray
} from '../../../utils';

const spec = {
  drop(props, monitor, component) {
		const droppedType = monitor.getItem().type;
		if (droppedType === QUEST_CONTENT_ITEM) {
			console.log(`Quest content with name ${monitor.getItem().content.title} dropped in quest content area`);
			if (props.placeholder) {
				const oldIndex = props.questContent.findIndex((content) => {
					return content._id === props.placeholder.content._id;
				});
				const newIndex = props.placeholder.index;
				if (newIndex !== oldIndex) {
					props.moveContent(oldIndex, newIndex);
				}
			}
		} else if (droppedType === POOL_CONTENT_ITEM) {
			console.log(`Pool content with name ${monitor.getItem().content.title} dropped in quest content area`);
			if (props.placeholder) {
				const newIndex = props.placeholder.index;
				props.addContent(monitor.getItem().content, newIndex);
			}
		}
    console.log(`Component ${component} dropped into the quest content area`);
    return {type: QUEST_CONTENT_AREA};
  },
  hover(props, monitor, component) {
    if (monitor.getItem().type === POOL_CONTENT_ITEM && !props.placeholder) {
      if (props.questContent.length === 0) {
				//only add the 0 placeholder if there are no cards to hover over so the
				//first card can be added
				props.movePlaceholder(0, monitor.getItem().content);
			}
    }
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
    console.log('rendering quest content area');
    const {
      questContent,
      placeholder,
      connectDropTarget,
      removeContent,
      selectContent,
      deselectContent,
      movePlaceholder,
    } = this.props;

    //insert placeholder into content
    let realQuestContent = questContent;
		let shouldRenderAddPlaceholder = false;
    if (placeholder) {
      const previousContentIndex = realQuestContent.findIndex((content) => {
        return content._id === placeholder.content._id;
      });
      if (previousContentIndex > -1) {
        realQuestContent = immutablyRemoveIndexFromArray(realQuestContent, previousContentIndex);
				realQuestContent = immutablyAddElementToArray(realQuestContent, placeholder.content, placeholder.index);
      } else {
				//adding new content in, so should render add placeholder
				shouldRenderAddPlaceholder = true;
			}
    }
    console.log('real content items - ', realQuestContent);

    const questContentElements = realQuestContent.map((content, index) => {
      let realIndex = index;
			if (placeholder && shouldRenderAddPlaceholder) {
				if (realIndex >= placeholder.index) {
					realIndex++;
				}
			}
			const contentItem = (
				<QuestContentItem
          key={content._id}
          content={content}
          removeContent={removeContent}
          index={realIndex}
          selectContent={selectContent}
          deselectContent={deselectContent}
          movePlaceholder={movePlaceholder}
          placeholder={placeholder}/>
			);
      // realIndex++;
      return contentItem;
		});

    if (shouldRenderAddPlaceholder) {
      questContentElements.splice(placeholder.index, 0, <QuestContentDragPlaceholder key="quest-drag-placeholder-key"/>);
    }

    console.log(questContentElements);

    let questContentElement = (
      // <ReactCSSTransitionGroup component="div"
      //                           styleName="quest-content-items"
      //                           transitionName="quest-content-item-transition"
      //                           transitionEnterTimeout={500}
      //                           transitionLeaveTimeout={500}>
				<div styleName="quest-content-items">
	        {questContentElements}
	        <QuestContentEndPlaceholder key="quest-end-placeholder-key" text="Add a card"/>
				</div>
      // </ReactCSSTransitionGroup>
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
export default DropTarget([POOL_CONTENT_ITEM, QUEST_CONTENT_ITEM], spec, collect)(QuestContentArea);
