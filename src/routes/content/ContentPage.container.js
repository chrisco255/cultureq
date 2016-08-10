import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import { Link } from 'react-router';
import _ from 'lodash';
import { createContent, deleteContent, editContent, finishEdit, fetchContents, titleChangeContent, descriptionChangeContent, urlChangeContent, quoteChangeContent, authorChangeContent } from '../../reducers/content/Content.actions';
import ContentForm from './content_form/ContentForm.component';
import { fetchPillars } from '../../reducers/pillar/Pillar.actions';
import Quote from '../../components/cards/quote.component';
import Video from '../../components/cards/video.component';
import Action from '../../components/cards/action.component';

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

const mapDispatchToProps = (dispatch) => ({
		createContent: (content) =>
			dispatch(createContent(content)),
    deleteContent: (content) =>
      dispatch(deleteContent(content)),
    editContent: (content, index) =>
      dispatch(editContent(content, index)),
    finishEdit: () =>
      dispatch(finishEdit()),
    titleChangeContent: (content, index) =>
      dispatch(titleChangeContent(content, index)),
    descriptionChangeContent: (content, index) =>
      dispatch(descriptionChangeContent(content, index)),
    urlChangeContent: (content, index) =>
      dispatch(urlChangeContent(content, index)),
    quoteChangeContent: (content, index) =>
      dispatch(quoteChangeContent(content, index)),
    authorChangeContent: (content, index) =>
      dispatch(authorChangeContent(content, index)),
		onLoad: () => {
      dispatch(fetchPillars({ query:pillarQuery }));
      dispatch(fetchContents({ query:contentQuery }));
    }
	});

const mapStateToProps = (state) => {
	return {
		pillars: state.pillar.pillars,
		contents: state.content.contents,
		isEditing: state.content.isEditing,
		contentThatIsBeingEdited: state.content.contentThatIsBeingEdited,
		contentThatIsBeingEditedIndex: state.content.contentThatIsBeingEditedIndex
	};
};

class ContentPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	onContentSubmit = (values, dispatch) => {
		dispatch( createContent(values) );
	}

	render() {

		let listContents = null;

    const activeContents = this.props.contents.filter((content) => !content.isDeleted);

    if(activeContents.length > 0) {
      listContents = this.props.contents.map((content, index) => {
        let pillarName = this.props.pillars[_.findIndex(this.props.pillars, (pillar) => pillar._id === content.pillarId)].name;

        if(!content.isDeleted) {
          return (
              <div>
                { content.type === 'QUOTE' &&
                  <Quote key={content._id} data={content.data} index={index} pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} editContent={this.props.editContent} isEditing={this.props.isEditing} contentThatIsBeingEdited={this.props.contentThatIsBeingEdited} contentThatIsBeingEditedIndex={this.props.contentThatIsBeingEditedIndex} finishEdit={this.props.finishEdit}
                  authorChangeContent={this.props.authorChangeContent} quoteChangeContent={this.props.quoteChangeContent} /> }
                { content.type === 'VIDEO' &&
                  <Video key={content._id} data={content.data} index={index} pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} editContent={this.props.editContent} isEditing={this.props.isEditing} contentThatIsBeingEdited={this.props.contentThatIsBeingEdited} contentThatIsBeingEditedIndex={this.props.contentThatIsBeingEditedIndex} titleChangeContent={this.props.titleChangeContent}
                         descriptionChangeContent={this.props.descriptionChangeContent}
                         finishEdit={this.props.finishEdit}
                         urlChangeContent={this.props.urlChangeContent} /> }
                { content.type === 'LUNCH' &&
                  <Action key={content._id} data={content.data} index={index} pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} /> }
              </div>
  				);
        }
			});
    }

		return (
      <div className="container">
				<div className="row">

					<div className={(activeContents.length > 0) ? 'col s6' : 'col s12'}>
						<div className="container">
	      			<ContentForm onSubmit={this.onContentSubmit} pillars={this.props.pillars} />
      			</div>
						<br />
						<div className="container" styleName="flex-space-between">
							<div>
								<Link className="waves-effect btn white black-text" to="/dashboard">Skip</Link>
							</div>
							<div>
								<Link className="waves-effect waves-light btn accent-background" to="/dashboard"><i className="material-icons right">play_arrow</i>Finish</Link>
							</div>
      			</div>
			    </div>

          { activeContents.length > 0 && <div className="col s6">
            <div className="container">
              <h1>Your Content</h1>
              <hr/>
              <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>{listContents}</div>
            </div>
          </div> }

				</div>
      </div>
		);
	}

}

ContentPage = CSSModules(ContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (ContentPage);
