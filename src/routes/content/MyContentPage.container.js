import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import ContentPageStyles from './ContentPage.css';
import { Link } from 'react-router';
import { fetchContents, setFilteredContents } from '../../reducers/content/Content.actions';
import contentQuery from './ContentQuery';
import List from './list/List.component';
import FeaturedQuests from './FeaturedQuests.component';
import Search from './Search.component';

const mapDispatchToProps = (dispatch) => ({
    setFilteredContents: (filteredContents) =>
      dispatch(setFilteredContents(filteredContents)),
		onLoad: () => {
      dispatch(fetchContents({ query:contentQuery }));
    }
	});

const mapStateToProps = (state) => {
	return {
		contents: state.content.contents,
    filteredContents: state.content.filteredContents
	};
};

class MyContentPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	render() {

    const { filteredContents, contents, setFilteredContents } = this.props;

		return (
      <div className="row" styleName="margin-top-40">
        <div className="container" styleName="container-width-90">
          <div className="col s12">
            <Link className="white-text waves-effect waves-light btn accent-background" styleName="link-text-transform" to="addcontent"><i className="material-icons left" styleName="margin-right-10">add</i>Add Content</Link>
            <Search contents={contents} />
          </div>
          <List contents={contents} filteredContents={filteredContents} setFilteredContents={setFilteredContents}/>
          <FeaturedQuests />
        </div>
      </div>
		);
	}

}

MyContentPage = CSSModules(MyContentPage, ContentPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (MyContentPage);
