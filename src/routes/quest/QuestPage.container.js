import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import QuestPageStyles from './QuestPage.css';
import {
	addContent,
	removeContent,
	selectContent,
	deselectContent,
	changeContentOrder,
	changeFilterText,
	movePlaceholder,
	commitDragMove,
	commitAddMove,
	fetchContentPool
} from '../../reducers/quest/Quest.actions';
import QuestCreateContainer from './quest_create_container/QuestCreateContainer.component';

const query = `
{
	contents {
    _id
    pillarId
    type
    isDeleted
    data {
      title
      description
      url
      quote
      author
      recipient
      recipientPosition
      richtext {
        blocks {
          key
          text
          type
          depth
        }
        entityMap {
          type
          mutability
        }
      }
    }
  }
}
`;

const mapDispatchToProps = (dispatch) => {
	return {
		addContent: (content, index) => {
			dispatch(addContent({ content, index }));
		},
		removeContent: (content) => {
			dispatch(removeContent({ content }));
		},
		selectContent: (content) => {
			dispatch(selectContent({ content }));
		},
		deselectContent: (content) => {
			dispatch(deselectContent({ content }));
		},
		changeContentOrder: (oldIndex, newIndex) => {
			dispatch(changeContentOrder(oldIndex, newIndex));
		},
		changeFilterText: (text) => {
			dispatch(changeFilterText(text));
		},
		movePlaceholder: (index, content) => {
			dispatch(movePlaceholder(index, content));
		},
		commitDragMove: (oldIndex, newIndex) => {
			dispatch(commitDragMove(oldIndex, newIndex));
		},
		commitAddMove: (index, content) => {
			dispatch(commitAddMove(index, content));
		},
    onLoad: () =>
			dispatch(fetchContentPool({ query }))
	};
};

const mapStateToProps = (state) => {
	return {
    newQuest: state.quest.newQuest,
    contentPool: state.quest.contentPool,
		filterText: state.quest.filterText,
		placeholder: state.quest.placeholder
	};
};

class QuestPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	render() {
    return (
			<div styleName="quest-page">
				<QuestCreateContainer
					styleName="quest-page"
					contentPool={this.props.contentPool}
					newQuest={this.props.newQuest}
					filterText={this.props.filterText}
					placeholder={this.props.placeholder}
					addContent={this.props.addContent}
					selectContent={this.props.selectContent}
					deselectContent={this.props.deselectContent}
					removeContent={this.props.removeContent}
					changeContentOrder={this.props.changeContentOrder}
					changeFilterText={this.props.changeFilterText}
					movePlaceholder={this.props.movePlaceholder}
					commitDragMove={this.props.commitDragMove}
					commitAddMove={this.props.commitAddMove}/>
			</div>
    );
	}

}

QuestPage = CSSModules(QuestPage, QuestPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (QuestPage);
