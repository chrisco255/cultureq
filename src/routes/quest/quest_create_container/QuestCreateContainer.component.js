import React, { Component } from 'react';
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
			filterText,
			addContent,
			removeContent,
			selectContent,
			deselectContent,
			changeContentOrder,
			changeFilterText
		} = this.props;

    return (
      <div styleName="quest-create-container">
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
					removeContent={removeContent}
					changeContentOrder={changeContentOrder}
					selectContent={selectContent}
					deselectContent={deselectContent} />
      </div>
    );
	}

}

QuestCreateContainer = CSSModules(QuestCreateContainer, QuestCreateContainerStyles);
export default DragDropContext(HTML5Backend)(QuestCreateContainer);
