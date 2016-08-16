import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import CSSModules from 'react-css-modules';
import QuestCreateContainerStyles from './QuestCreateContainer.css';
import ContentPool from '../content_pool/ContentPool.component';
import QuestContentArea from '../quest_content_area/QuestContentArea.component';
import QuestDragLayer from '../quest_drag_layer/QuestDragLayer.component';

class QuestCreateContainer extends Component {

	render() {
    const {
			newQuest,
			contentPool,
			filterText,
			placeholder,
			addContent,
			removeContent,
			selectContent,
			deselectContent,
			changeContentOrder,
			changeFilterText,
			movePlaceholder,
			commitDragMove,
			commitAddMove
		} = this.props;

    return (
      <div styleName="quest-create-container">
				<QuestDragLayer />
				<ContentPool
					pool={contentPool}
					questContent={newQuest.content}
					filterText={filterText}
					addContent={addContent}
					selectContent={selectContent}
					deselectContent={deselectContent}
					changeFilterText={changeFilterText} />
				<QuestContentArea
					questContent={newQuest.content}
					placeholder={placeholder}
					addContent={addContent}
					removeContent={removeContent}
					changeContentOrder={changeContentOrder}
					selectContent={selectContent}
					deselectContent={deselectContent}
					movePlaceholder={movePlaceholder}
					commitDragMove={commitDragMove}
					commitAddMove={commitAddMove} />
      </div>
    );
	}

}

QuestCreateContainer = CSSModules(QuestCreateContainer, QuestCreateContainerStyles);
export default DragDropContext(HTML5Backend)(QuestCreateContainer);
