import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import QuestPageStyles from './QuestPage.css';
import {
	addContent, removeContent, selectContent, deselectContent, changeContentOrder
} from '../../reducers/quest/Quest.actions';
import QuestCreateContainer from './quest_create_container/QuestCreateContainer.component';

// const query = `
// {
//   pillars {
//     _id
//     tenantId
//     name
//     isDeleted
//     content {
//       _id
//     }
//   }
// }
// `;

const mapDispatchToProps = (dispatch) => {
	return {
		addContent: (content) => {
			dispatch(addContent({ content }));
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
		}
    // onLoad: () =>
		// 	dispatch(fetchPillars({ query }))
	};
};

const mapStateToProps = (state) => {
	return {
    newQuest: state.quest.newQuest,
    contentPool: state.quest.contentPool
	};
};

class QuestPage extends Component {

	componentDidMount() {
    //onload would fetch the current content pool from the server
		// this.props.onLoad()
	}

	render() {
    return (
			<QuestCreateContainer
				contentPool={this.props.contentPool}
				newQuest={this.props.newQuest}
				addContent={this.props.addContent}
				selectContent={this.props.selectContent}
				deselectContent={this.props.deselectContent}
				removeContent={this.props.removeContent}
				changeContentOrder={this.props.changeContentOrder}/>
    );
	}

}

QuestPage = CSSModules(QuestPage, QuestPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (QuestPage);
