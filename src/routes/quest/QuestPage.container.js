import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import QuestPageStyles from './QuestPage.css';
import Sortable from '../../components/sortable/Sortable.component';
import SortableLibrary from 'sortablejs';
import { addContent } from '../../reducers/quest/Quest.actions';

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

	constructor() {
		super();
		this.options = {
			group: 'questContent',
			animation: 300,
			dataIdAttr: 'data-content-id'
		};
	}

	componentDidMount() {
    //onload would fetch the current content pool from the server
		// this.props.onLoad()
	}

	sortableGroupDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      const options = {
				sortable: false
			};
      SortableLibrary.create(componentBackingInstance, { ...this.options, options });
    }
  };

  sortableContainersDecorator = (componentBackingInstance) => {
    if (componentBackingInstance) {
      const options = {};
      SortableLibrary.create(componentBackingInstance, options);
    }
  };

	render() {
    const convertContentToCard = (content, index) => {
      return (
        <div className="card" key={index} data-content-id={content._id}>
          <div className="card-content">
            <div className="card-title">{content.title}</div>
            <div>{content.description}</div>
          </div>
        </div>
      );
    };

		const sortableOptions = {
				sort: true,
				onAdd: (event) => {
					event.preventDefault();
					event.stopImmediatePropagation();
					console.log('calling on add');
					console.log('Event - ', event);
				},
				onMove: (event) => {
					console.log('calling on move');
					console.log('Event - ', event);
				},
				onSort: (event) => {
					event.preventDefault();
					console.log('calling on sort');
					console.log('Event - ', event);
				}
				// onAdd: (event) => {
				// 	console.log('Event - ', event.item.getAttribute('data-content-id'));
				// 	return false;
				// }
		};
    let contentPool;
		const contentItems = this.props.contentPool.map((content, index) => {
			return (
				<div className="card" key={index} data-content-id={content._id}>
					<div className="card-content">
						<a className="btn-floating waves-effect waves-light red" styleName="add-content-button" onClick={() => {this.props.addContent(content);}}>
							<i className="material-icons">add</i>
						</a>
						<div className="card-title">{content.title}</div>
						<div>{content.description}</div>
					</div>
				</div>
			);
		});

		if (this.props.contentPool.length > 0) {
      contentPool = (
        <div ref={this.sortableContainersDecorator}>
          <div ref={this.sortableGroupDecorator}>
						{contentItems}
          </div>
        </div>
      );
    } else {
      contentPool = (
        <div styleName="content-pool-empty">No content items</div>
      );
    }

    return (
      <div styleName="quest-create-container">
        <div styleName="content-pool">
          {contentPool}
        </div>
        <div styleName="quest-content">
          <Sortable
						items={this.props.newQuest.content}
						mapFunction={convertContentToCard}
						options={{ ...this.options, ...sortableOptions }}
						noItemsMessage="Please add a card"/>
        </div>
      </div>
    );
	}

}

QuestPage = CSSModules(QuestPage, QuestPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (QuestPage);
