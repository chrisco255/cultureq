import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import { Link, IndexLink } from 'react-router';
import _ from 'lodash';
import { addContent, removeContent, editContent, addContentList } from '../../reducers/content/Content.actions';
import ContentForm from './content_form/ContentForm.component';
import { fetchPillars } from '../../reducers/pillar/Pillar.actions';

const pillarQuery = `
{
  pillars {
    _id
    tenantId
    name
    isDeleted
    content {
      _id
    }
  }
}
`;

const mapDispatchToProps = (dispatch) => {
	return {
		// Adds a content to the selectedContents array
		addContent: (content) =>
			dispatch(addContent(content)),
		// Removes a content from the selectedContents array and adds it to contents array
		removeContent: (content) =>
		 	dispatch(removeContent(content)),
		// Edit a content
		editContent: (content) =>
			dispatch(editContent(content)),
		// Adds the selectedContents list to the server
		addContentList: (contents) =>
			dispatch(addContentList(contents)),
		onLoad: () =>
			dispatch(fetchPillars({ pillarQuery }))
	}
}

const mapStateToProps = (state) => {
	return {
		pillars: state.pillar.pillars,
		contents: state.content.contents,
		selectedContents: state.content.selectedContents,
		isEditing: state.content.isEditing
	}
}

var theEditContent = null;

$(document).ready(function(){
	$('.collapsible').collapsible({
		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});
});

class ContentPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}


	onContentSubmit = (values, dispatch) => {
		console.log('ADD CONTENT', values);
		dispatch( removeContent(values) );
	}

	submitContentList = () => {
		console.log('FINISH', this.props.selectedContents);
		this.props.addContentList(this.props.selectedContents);
	}

	editContent = (content) => {
		theEditContent = this.props.editContent(content).payload.content;
	}
	handleChange = (event) => {
		this.setState({value: event.target.value});
	}

	render() {

		console.log('PILLARS', this.props.pillars);

		var listContents = null;
		var listSelectedContents = null;

		if(this.props.contents.length < 1) {
			listContents = (
				// <div className="collection-item">
				// 	There are no more content to select. Create new ones!
				// </div>
				<li>
					<div className="collapsible-header">No Content to Select</div>
    			<div className="collapsible-body"><p>Nothing to see here...</p></div>
    		</li>
			);
		} else {
			listContents = this.props.contents.map((content, index) => {
				return (
					// <a className="collection-item" key={content._id} > {content.type}
					// 	<div className="secondary-content hand" onClick={this.props.addContent.bind(this, content)}>
					// 		<i className="material-icons">add_circle</i>
	     	// 		</div>
					// 	<div className="secondary-content hand" onClick={this.props.editContent.bind(this, content)}>
					// 		<i className="material-icons">mmode_edit</i>
	     	// 		</div>
					// </a>
					<li key={content._id}>
     				<div className="collapsible-header">Content #{index + 1}</div>
						<div className="collapsible-body">
							<p>Content type: {content.type}</p>
							{/*<p>Content data: {content.data}</p>*/}
						</div>
     			</li>
				)
			});
		}

		if(this.props.selectedContents.length < 1) {
			listSelectedContents = (
				<div className="collection-item">
					You have not selected any contents!
				</div>
			);
		} else {
			listSelectedContents =
				this.props.selectedContents.map((content) => {
					return (
						<a className="collection-item hand" key={content._id} >
      				{content.type}
							<div className="secondary-content" onClick={this.props.removeContent.bind(this, content)}>
       					<i className="material-icons">delete</i>
       				</div>
      			</a>
					);
				});
		}


		return (
				<div className="row">
					<div className="col s3" styleName="side-bar">
						<div className="container">
		    			<h1 styleName="title">Selected Content</h1>
							<hr/>
							<div>
					 			{/*<div className="collection">
					 			 {listSelectedContents}
					 			</div>*/}
								<ul className="collapsible" data-collapsible="accordion">
					 			 {listSelectedContents}
					 			</ul>
				 		 </div>
	    			</div>
					</div>
					<div className="col s9">
						<div className="container">
							<h1 styleName="title">Choose Content</h1>
							<hr/>
							<div>
					 			{/*<div className="collection">
					 			 {listContents}
					 			</div>*/}
								<ul className="collapsible" data-collapsible="accordion">
					 			 {listContents}
					 			</ul>
				 		 </div>
						</div>
						<div className="container">
	      			<ContentForm onSubmit={this.onContentSubmit}/>
      			</div>
						<br />
						<br />
						<div className="container" styleName="flex-space-between">
							<div>
								<Link className="waves-effect waves-light btn" to="/dashboard">Skip</Link>
							</div>
							<div>
								<button className="waves-effect waves-light btn" onClick={this.submitContentList}>Finish</button>
							</div>
      			</div>
			    </div>
				</div>
		);
	}

}

ContentPage = CSSModules(ContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (ContentPage);
