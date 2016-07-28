import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import QuestPageStyles from './QuestPage.css';
import _ from 'lodash';
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
    // contentPool: state.newQuest.contentPool
	};
};

class QuestPage extends Component {

	componentDidMount() {
    //onload would fetch the current content pool from the server
		// this.props.onLoad()
	}

	render() {
    return (
      <div styleName="quest-create-container">
        <div styleName="content-pool">

        </div>
        <div styleName="quest-content">

        </div>
      </div>
    );
	}

}

QuestPage = CSSModules(QuestPage, QuestPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (QuestPage);
