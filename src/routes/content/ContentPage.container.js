import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import { Link, IndexLink } from 'react-router';
import _ from 'lodash';
// import { addContent, removeContent, editContent, addContentList } from '../../reducers/content/Content.actions';
import ContentForm from './content_form/ContentForm.component';

const mapDispatchToProps = (dispatch) => {
	return {
		// // Adds a content to the selectedContents array
		// addContent: (content) =>
		// 	dispatch(addContent(content)),
		// // Removes a content from the selectedContents array and adds it to contents array
		// removeContent: (content) =>
		//  	dispatch(removeContent(content)),
		// // Edit a content
		// editContent: (content) =>
		// 	dispatch(editContent(content)),
		// // Adds the selectedContents list to the server
		// addContentList: (contents) =>
		// 	dispatch(addContentList(contents))
	}
}

const mapStateToProps = (state) => {
	return {
		// contents: state.content.contents,
		// selectedContents: state.content.selectedContents,
		// isEditing: state.content.isEditing
	}
}

var theEditContent = null;

class ContentPage extends Component {

	onContentSubmit = (values, dispatch) => {
		console.log('ADD PILLAR', values);
		dispatch( removeContent(values) );
	}

	submitContentList = () => {
		console.log('CONTINUE', this.props.selectedContents);
		this.props.addContentList(this.props.selectedContents);
	}

	editContent = (content) => {
		theEditContent = this.props.editContent(content).payload.content;
	}
	handleChange = (event) => {
		this.setState({value: event.target.value});
	}

	render() {

		var listContents = null;
		var listSelectedContents = null;

		listContents = (
			<div className="collection-item">
				There are no more contents to select. Create new ones!
			</div>
		);

		listSelectedContents = (
			<div className="collection-item">
				You have not selected any contents!
			</div>
		);

		return (
				<div className="row">
					<div className="col s3" styleName="side-bar">
						<div className="container">
		    			<h1 styleName="title">Selected Content</h1>
							<hr/>
							<div>
					 			<div className="collection">
					 			 {listSelectedContents}
					 			</div>
				 		 </div>
	    			</div>
					</div>
					<div className="col s9">
						<div className="container">
							<h1 styleName="title">Choose Content</h1>
							<hr/>
							<div>
					 			<div className="collection">
					 			 {listContents}
					 			</div>
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
