import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';



const mapStateToProps = state => ({
	lock: state.auth.lock,
	idToken: state.auth.idToken
});


let mapDispatchToProps = dispatch => ({

});


let Home = React.createClass({
	showLock() {
		this.props.lock.show();
	},
	render() {
		return (
			<div>
				{ this.props.idToken ? <p>LOGGED IN</p> : null }
				<h1>Hello World</h1>

				{ this.props.idToken ? '' : <button onClick={this.showLock}>Log In</button> }
			</div>
		);
	}
});

Home = withRouter(Home); // Wrapping in order to have redirect work with this.props.router.push()
export default connect(mapStateToProps, mapDispatchToProps)(Home);