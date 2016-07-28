import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import QuestPageStyles from './QuestPage.css';
import Sortable from '../../components/sortable/Sortable.component';
// import { createPillar, deletePillar, editPillar, nameChangePillar, fetchPillars } from '../../reducers/pillar/Pillar.actions';

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
    const convertContentToThumbnail = (content, index) => {
      return (
        <div className="card" key={index}>
          <div className="card-content">
            <a className="btn-floating waves-effect waves-light red" styleName="add-content-button"><i className="material-icons">add</i></a>
            <div className="card-title">{content.title}</div>
            <div>{content.description}</div>
          </div>
        </div>
      );
    };
    const contentPoolElements = this.props.contentPool.map(convertContentToThumbnail);

    return (
      <div styleName="quest-create-container">
        <div styleName="content-pool">
          {contentPoolElements}
        </div>
        <div styleName="quest-content">
          <Sortable items={this.props.newQuest.content} mapFunction={convertContentToThumbnail} noItemsMessage="Please add a card" />
        </div>
      </div>
    );
	}

}

QuestPage = CSSModules(QuestPage, QuestPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (QuestPage);
