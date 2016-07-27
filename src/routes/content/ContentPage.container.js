import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import { Link, IndexLink } from 'react-router';
import _ from 'lodash';
import { createContent, deleteContent, fetchContents } from '../../reducers/content/Content.actions';
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
    isDeleted
    data {
      title
      description
      url
      quote
      author
      recipient
      recipientPosition
    }
  }
}
`;

const mapDispatchToProps = (dispatch) => {
	return {
		createContent: (content) =>
			dispatch(createContent(content)),
    deleteContent: (content) =>
      dispatch(deleteContent(content)),
		onLoad: () =>
    {
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
    var activeContents = null;

    activeContents = this.props.contents.filter((content) => !content.isDeleted);

    if(activeContents.length > 0) {
      createContentListClassName = "col s6";
      listContents = this.props.contents.map((content, index) => {
        if(!content.isDeleted) {
          return (
              <div className="card blue-grey darken-1" key={content._id}>
                <div className="card-content white-text">
                  <span className="card-title">Content #{index + 1}</span>
                  <p>Linked to Pillar: {this.props.pillars[_.findIndex(this.props.pillars, (pillar) => pillar._id === content.pillarId)].name}</p>
                  {content.type === 'QUOTE' &&
                  <div>
                    <p>Quote: {content.data.quote}</p>
                    <p>Author: {content.data.author}</p>
                  </div>}
                  {content.type === 'VIDEO' &&
                  <div>
                    <p>Title: {content.data.title}</p>
                    <p>Description: {content.data.description}</p>
                    <p>URL: {content.data.url}</p>
                  </div>}
                  {content.type === 'LUNCH' &&
                  <div>
                    <p>Recipient: {content.data.recipient}</p>
                    <p>Position: {content.data.recipientPosition}</p>
                  </div>}
                </div>
                <div className="card-action" styleName="flex-space-between">
                  <a className="hand">Edit</a>
                  <a className="hand" onClick={this.props.deleteContent.bind(this, content)}><i className="material-icons">delete</i></a>
                </div>
              </div>
  				);
        }
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

          { activeContents.length > 0 && <div className="col s6">
            <div className="container">
              <h1 styleName="title">Your Content</h1>
              <hr/>
              <div>{listContents}</div>
            </div>
          </div> }

				</div>
      </div>
		);
	}

}

ContentPage = CSSModules(ContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (ContentPage);
