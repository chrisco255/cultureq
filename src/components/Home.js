import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	lock: state.lock,
	idToken: state.idToken
});


let mapDispatchToProps = dispatch => ({
	onLogOut: () =>
		dispatch({ type: 'LOG_OUT' })
});


let Home = React.createClass({
	logOut() {
		this.props.onLogOut();
		this.props.router.push('/');
	},
	showLock() {
		// We receive lock from the parent component in this case
		// If you instantiate it in this component, just do this.lock.show()
		this.props.lock.show();
	},

	render() {
		return (
			<div>
				{
					this.props.idToken ? <p>Yoooo</p> : null
				}
				<h1>Hello World</h1>
				<Link to="/signup">Sign Up</Link>

				<div className="login-box">
					<a onClick={this.showLock}>Sign In</a>
				</div>

				<div>
					<a onClick={this.props.onLogOut}>Logout</a>
				</div>
			</div>
		);
	}
});

//export default Home;
Home = withRouter(Home);

export default connect(mapStateToProps, mapDispatchToProps)(Home);