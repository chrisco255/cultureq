import React from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	lock: state.lock
});


const mapDispatchToProps = dispatch => ({
	onLogOut: (tag, payload) =>
		dispatch({ type: 'LOG_OUT'})
});


let Dashboard = React.createClass({
	logout() {
		this.props.router.push('/');
		this.props.onLogOut();
	},


	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				<Link to="/home">Home</Link>
				<div>
					<a onClick={this.logout}>Logout</a>
				</div>
			</div>
		);
	}
});

Dashboard = withRouter(Dashboard);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);