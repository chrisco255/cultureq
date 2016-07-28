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
    contentPool: state.quest.contentPool
	};
};

class QuestPage extends Component {

	componentDidMount() {
    //onload would fetch the current content pool from the server
		// this.props.onLoad()
	}

	render() {
    const contentPoolElements = this.props.contentPool.map((content, index) => {

      return (
        <div className="card" key={index}>
          <div className="card-content">
            <div className="card-title">{content.title}</div>
            <div>{content.description}</div>
          </div>
        </div>
      );
    });
    return (
      <div styleName="layout-container">
        <div styleName="quest-create-container">
          <div styleName="content-pool">
            {contentPoolElements}
          </div>
          <div styleName="quest-content">

          </div>
        </div>
      </div>
    );
	}

}

QuestPage = CSSModules(QuestPage, QuestPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (QuestPage);
