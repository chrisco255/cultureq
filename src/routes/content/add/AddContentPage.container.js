import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import styles from '../ContentPage.css';
import { createContent, deleteContent, editContent, finishEdit, formEnable, fetchContents, titleChangeContent, descriptionChangeContent, urlChangeContent, quoteChangeContent, authorChangeContent } from '../../../reducers/content/Content.actions';
import { fetchPillars } from '../../../reducers/pillar/Pillar.actions';
import SideMenu from './SideMenu.component';
import FormArea from './FormArea.component';
import ContentPreview from './ContentPreview.component';
import contentQuery from '../ContentQuery';
import pillarQuery from '../../pillar/PillarQuery';

const mapDispatchToProps = (dispatch) => ({
		createContent: (content) =>
			dispatch(createContent(content)),
    deleteContent: (content) =>
      dispatch(deleteContent(content)),
    editContent: (content) =>
      dispatch(editContent(content)),
    finishEdit: () =>
      dispatch(finishEdit()),
    formEnable: (isCreatingContent, currentContentType) =>
      dispatch(formEnable(isCreatingContent, currentContentType)),
    titleChangeContent: (content, _id) =>
      dispatch(titleChangeContent(content, _id)),
    descriptionChangeContent: (content, _id) =>
      dispatch(descriptionChangeContent(content, _id)),
    urlChangeContent: (content, _id) =>
      dispatch(urlChangeContent(content, _id)),
    quoteChangeContent: (content, _id) =>
      dispatch(quoteChangeContent(content, _id)),
    authorChangeContent: (content, _id) =>
      dispatch(authorChangeContent(content, _id)),
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
    isCreatingContent: state.content.isCreatingContent,
    currentContentType: state.content.currentContentType
	};
};

class AddContentPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	render() {

    let { currentContentType, formEnable, isCreatingContent, pillars, createContent, contents, deleteContent, editContent, isEditing, contentThatIsBeingEdited, finishEdit, authorChangeContent, quoteChangeContent, titleChangeContent, descriptionChangeContent, urlChangeContent } = this.props;
    const { params } = this.props;

    if(params.currentContentType) {
      currentContentType = params.currentContentType;
    }

    return (
      <div className="displayFlex">

        <SideMenu currentContentType={currentContentType} formEnable={formEnable} isCreatingContent={isCreatingContent} />

        <FormArea currentContentType={currentContentType} pillars={pillars} createContent={createContent}/>

        <ContentPreview currentContentType={currentContentType} contents={contents} pillars={pillars} deleteContent={deleteContent} editContent={editContent} isEditing={isEditing} contentThatIsBeingEdited={contentThatIsBeingEdited} finishEdit={finishEdit} authorChangeContent={authorChangeContent} quoteChangeContent={quoteChangeContent} titleChangeContent={titleChangeContent} descriptionChangeContent={descriptionChangeContent} urlChangeContent={urlChangeContent} />

      </div>
		);
	}

}

AddContentPage = CSSModules(AddContentPage, styles);
export default connect(mapStateToProps, mapDispatchToProps) (AddContentPage);
