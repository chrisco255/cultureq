import React, { Component } from 'react';
import { DragSource } from 'react-dnd';
import CSSModules from 'react-css-modules';
import PoolContentStyles from './PoolContentItem.css';
import { POOL_CONTENT_ITEM, QUEST_CONTENT_AREA } from '../ItemTypes';
import RightArrow from '../../../assets/images/right_arrow_gray.svg';
import EditIcon from '../../../assets/images/icon-edit.svg';

const spec = {
  beginDrag(props) {
    return {
      id: props.content._id,
      type: POOL_CONTENT_ITEM
    };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop() && monitor.getDropResult().type === QUEST_CONTENT_AREA) {
      console.log(`Pool content with name ${props.content.title} dropped`);
      props.addContent(props.content);
    }
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
};

class PoolContentItem extends Component {

	render() {
    const {
      content,
      connectDragSource,
      addContent,
      selectContent,
      deselectContent,
      isDragging
    } = this.props;

    const styles = {};
    if (content.isSelected) styles.backgroundColor = '#f1f1f1';
    if (isDragging) styles.opacity = 0;
    const selectToggle = content.isSelected ? deselectContent : selectContent;

    const addContentWrapper = (event, content) => {
      //stop bubbling of events because if bubbling events make it so that
      //a select event fires right after the add event and causes problems
      event.preventDefault();
      event.stopPropagation();
      addContent(content);
    };

    const onEdit = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      connectDragSource(
        <div className="card" styleName="content-card" style={styles} onClick={() => {selectToggle(content);}}>
          <div className="card-content" styleName="card-content">
            <div styleName="card-column">
              <div styleName="card-text">
                <div className="card-title" styleName="card-title">{content.title}</div>
                <div styleName="card-description">{content.description}</div>
              </div>
              <div styleName="bottom-buttons">
                 <a className="waves-effect waves-default btn-flat" styleName="button" onClick={onEdit}><img src={EditIcon} alt="Edit Icon" />edit</a>
              </div>
            </div>
            <div styleName="card-column">
              <div styleName="side-buttons">
                <img styleName="button" src={RightArrow} alt="right arrow" onClick={(event) => {addContentWrapper(event, content);}}/>
              </div>
            </div>
          </div>
        </div>
      )
    );
	}

}

PoolContentItem = CSSModules(PoolContentItem, PoolContentStyles);
export default DragSource(POOL_CONTENT_ITEM, spec, collect)(PoolContentItem);
