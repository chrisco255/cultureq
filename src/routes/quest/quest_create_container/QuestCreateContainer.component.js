import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CSSModules from 'react-css-modules';
import QuestCreateContainerStyles from './QuestCreateContainer.css';
import ContentPool from '../content_pool/ContentPool.component';
import QuestContentArea from '../quest_content_area/QuestContentArea.component';

class QuestCreateContainer extends Component {

	render() {
    const {
			newQuest,
			contentPool,
			addContent,
			removeContent,
			selectContent,
			deselectContent,
			changeContentOrder
		} = this.props;

    return (
      <div styleName="quest-create-container">
				<ContentPool
					pool={contentPool}
					questContent={newQuest.content}
					addContent={addContent}
					selectContent={selectContent}
					deselectContent={deselectContent} />
				<QuestContentArea
					questContent={newQuest.content}
					removeContent={removeContent}
					changeContentOrder={changeContentOrder} />
      </div>
    );
	}

}

QuestCreateContainer = CSSModules(QuestCreateContainer, QuestCreateContainerStyles);
export default DragDropContext(HTML5Backend)(QuestCreateContainer);
