import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import { Link, IndexLink } from 'react-router';
import _ from 'lodash';
import { createContent, fetchContents } from '../../reducers/content/Content.actions';
import ContentForm from './content_form/ContentForm.component';
import { fetchPillars } from '../../reducers/pillar/Pillar.actions';

const pillarQuery = `
{
  pillars {
    _id
    name
    isDeleted
  }
}
`;

const contentQuery = `
{
	contents {
	  _id
	  pillarId
	  type
    data {
      title
      description
      url
      quote
      author
      recipient
      recipientPosition
    }
    isDeleted
	}
}
`;

const mapDispatchToProps = (dispatch) => {
	return {
		createContent: (content) =>
			dispatch(createContent(content)),
		onLoad: () => {
			dispatch(fetchPillars({ query:pillarQuery }))
      dispatch(fetchContents({ query:contentQuery }))
    }
	}
}

const mapStateToProps = (state) => {
	return {
		pillars: state.pillar.pillars,
		contents: state.content.contents,
		isEditing: state.content.isEditing
	}
}

var theEditContent = null;

$(document).ready(function(){
	$('.collapsible').collapsible({
		accordion : false
	});
});

class ContentPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	onContentSubmit = (values, dispatch) => {
    console.log('CREATE CONTENT', values);
		dispatch( createContent(values) );
	}

	editContent = (content) => {
		theEditContent = this.props.editContent(content).payload.content;
	}

	handleChange = (event) => {
		this.setState({value: event.target.value});
	}

	render() {

    console.log('PILLARS', this.props.pillars);
		console.log('CONTENTS', this.props.contents);

		var listContents = null;
    var createContentListClassName = null;

    if(this.props.contents > 0) {
      createContentListClassName = "col s6";
      listContents = this.props.contents.map((content, index) => {
				return (
					<li key={content._id}>
     				<div className="collapsible-header">Content #{index + 1}</div>
						<div className="collapsible-body">
							<p>Content type: {content.type}</p>
						</div>
     			</li>
				)
			});
    } else {
      createContentListClassName = "col s12";
    }

		return (
      <div className="container">
				<div className="row">

					<div className={createContentListClassName}>
						<div className="container">
	      			<ContentForm onSubmit={this.onContentSubmit} pillars={this.props.pillars} />
      			</div>
						<br />
						<div className="container" styleName="flex-space-between">
							<div>
								<Link className="waves-effect waves-light btn red" to="/dashboard">Skip</Link>
							</div>
							<div>
								<Link className="waves-effect waves-light btn green" to="/dashboard">Finish</Link>
							</div>
      			</div>
			    </div>

          { this.props.contents.length > 0 && <div className="col s6">
            <div className="container">
              <h1 styleName="title">Your Content</h1>
              <hr/>
              <div>
                <ul className="collapsible" data-collapsible="accordion">
                 {listContents}
                </ul>
             </div>
            </div>
          </div> }

				</div>
      </div>
		);
	}

}

ContentPage = CSSModules(ContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (ContentPage);
