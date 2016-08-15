import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import _ from 'lodash';
import { createContent, deleteContent, editContent, finishEdit, formEnable, fetchContents, titleChangeContent, descriptionChangeContent, urlChangeContent, quoteChangeContent, authorChangeContent } from '../../reducers/content/Content.actions';
import ContentForm from './content_form/ContentForm.component';
import { fetchPillars } from '../../reducers/pillar/Pillar.actions';
import Quote from '../../components/cards/Quote.component';
import Video from '../../components/cards/Video.component';

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
        richtext {
          blocks {
            key
            text
            type
            depth
          }
          entityMap {
            type
            mutability
          }
        }
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
    formEnable: (isCreatingContent) =>
      dispatch(formEnable(isCreatingContent)),
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
		contentThatIsBeingEditedIndex: state.content.contentThatIsBeingEditedIndex,
    isCreatingContent: state.content.isCreatingContent
	};
};

class ContentPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	onContentSubmit = (values, dispatch) => {
    console.log(values);
		dispatch( createContent(values) );
	}

	render() {

		let listContents = null;

    const activeContents = this.props.contents.filter((content) => !content.isDeleted);
    let contentViewOrder = {display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around'};

    if (this.props.isCreatingContent) {
      delete contentViewOrder.flexWrap;
      delete contentViewOrder.justifyContent;
      contentViewOrder.alignItems = 'center';
      contentViewOrder.flexDirection = 'column';
    }

    if(activeContents.length > 0) {
      listContents = this.props.contents.map((content, index) => {

        let pillarName = content.pillarId;
        const pillarNameIndex = _.findIndex(this.props.pillars, (pillar) => pillar._id === content.pillarId);
        if (pillarNameIndex > -1) {
          pillarName = this.props.pillars[pillarNameIndex].name;
        }

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
                {/*{ content.type === 'LUNCH' &&
                  <Action key={content._id} data={content.data} index={index} pillarName={pillarName} deleteContent={this.props.deleteContent} content={content} /> }*/}
              </div>
  				);
        }
			});
    }

		return (
      <div className="container">

				<div className="row">
					{ (this.props.isCreatingContent || activeContents.length === 0) && <div className="col s12">
	      			<ContentForm onSubmit={this.onContentSubmit} pillars={this.props.pillars} />
			        <br />
			    </div> }

          { activeContents.length > 0 && <div style={(this.props.isCreatingContent) ? {display: 'none'} : {}}>
            <div className="container">
              {this.props.isCreatingContent && <h1>Content Preview</h1>}
              {!this.props.isCreatingContent && <div className="row">
                  <form className="col s12">
                    <div className="row">
                      <div className="input-field col s12">
                        <i className="material-icons prefix" style={{color: '#757575'}}>search</i>
                        <input id="icon_prefix" type="text" className="validate" placeholder="search" />
                        {/*<label htmlFor="icon_prefix">Search</label>*/}
                      </div>
                    </div>
                  </form>
                </div>}
              <div style={contentViewOrder}>{listContents}</div>
            </div>
          </div> }
				</div>

        <div className="fixed-action-btn" style={{bottom: '45px', right: '24px'}}>
          <a className="btn-floating btn-large waves-effect waves-light accent-background" onClick={this.props.formEnable.bind(this, this.props.isCreatingContent)}>{(!this.props.isCreatingContent) ? <i className="material-icons">add</i> : <i className="material-icons">arrow_back</i>}</a>
        </div>

      </div>
		);
	}

}

ContentPage = CSSModules(ContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (ContentPage);
