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
	changeFilterText
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
		}
    // onLoad: () =>
		// 	dispatch(fetchPillars({ query }))
	};
};

const mapStateToProps = (state) => {
	return {
    newQuest: state.quest.newQuest,
    contentPool: state.quest.contentPool,
		filterText: state.quest.filterText
	};
};

class QuestPage extends Component {

	componentDidMount() {
    //onload would fetch the current content pool from the server
		// this.props.onLoad()
	}

	render() {
    return (
			<div styleName="quest-page">
				<QuestCreateContainer
					styleName="quest-page"
					contentPool={this.props.contentPool}
					newQuest={this.props.newQuest}
					filterText={this.props.filterText}
					addContent={this.props.addContent}
					selectContent={this.props.selectContent}
					deselectContent={this.props.deselectContent}
					removeContent={this.props.removeContent}
					changeContentOrder={this.props.changeContentOrder}
					changeFilterText={this.props.changeFilterText}/>
			</div>
    );
	}

}

QuestPage = CSSModules(QuestPage, QuestPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (QuestPage);
