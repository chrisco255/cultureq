import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from './CreateQuestPage.css';
import {
	addContent,
	removeContent,
	selectContent,
	deselectContent,
	changeContentFilterText,
	movePlaceholder,
	moveContent,
	fetchContentPool
} from '../../../reducers/quest/Quest.actions';
import QuestCreateContainer from './quest_create_container/QuestCreateContainer.component';
import QuestNavBar from './quest_nav_bar/QuestNavBar.component';

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
		changeFilterText: (text) => {
			dispatch(changeContentFilterText(text));
		},
		movePlaceholder: (index, content) => {
			dispatch(movePlaceholder(index, content));
		},
		moveContent: (oldIndex, newIndex) => {
			dispatch(moveContent(oldIndex, newIndex));
		},
    onLoad: () =>
			dispatch(fetchContentPool({ query }))
	};
};

const mapStateToProps = (state) => {
	return {
    newQuest: state.quest.newQuest,
    contentPool: state.quest.contentPool,
		filterText: state.quest.contentFilterText,
		placeholder: state.quest.placeholder
	};
};

class CreateQuestPage extends Component {

	componentDidMount() {
		this.props.onLoad();
		$('.menu-navbar').hide();
	}

	render() {
		const onSave = () => {
			console.log('quest saved');
		};

		const onLaunch = () => {
			console.log('quest launched');
		};

    return (
			<div styleName="quest-page">
				<QuestNavBar quest={this.props.newQuest} onSave={onSave} onLaunch={onLaunch} />
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
					changeFilterText={this.props.changeFilterText}
					movePlaceholder={this.props.movePlaceholder}
					moveContent={this.props.moveContent}/>
			</div>
    );
	}

}

CreateQuestPage = CSSModules(CreateQuestPage, styles);
export default connect(mapStateToProps, mapDispatchToProps) (CreateQuestPage);
