import React from 'react';


//const mapStateToProps = state => ({
//	appName: state.appName,
//	tags: state.tags,
//	token: state.token
//});
//
//const mapDispatchToProps = dispatch => ({
//	onClickTag: (tag, payload) =>
//		dispatch({ type: 'APPLY_TAG_FILTER', tag, payload }),
//	onLoad: (tab, payload) =>
//		dispatch({ type: 'HOME_PAGE_LOADED', tab, payload }),
//	onUnload: () =>
//		dispatch({  type: 'HOME_PAGE_UNLOADED' })
//});

class Home extends React.Component {
	//componentWillMount() {
	//	const tab = this.props.token ? 'feed' : 'all';
	//	const articlesPromise = this.props.token ?
	//		agent.Articles.feed() :
	//		agent.Articles.all();
	//
	//	this.props.onLoad(tab, Promise.all([agent.Tags.getAll(), articlesPromise]));
	//}

	//componentWillUnmount() {
	//	this.props.onUnload();
	//}

	render() {
		return (
			<div>
				Hello World
			</div>
		);
	}
}

//export default connect(mapStateToProps, mapDispatchToProps)(Home);
export default Home;