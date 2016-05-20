import React, { Component } from 'react';
import { Link, withRouter } from 'react-router';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
	lock: state.lock
});

const mapDispatchToProps = dispatch => ({

});

class Dashboard extends Component {
	logout = () => {
		this.props.router.push('/');
		this.props.onLogOut();
	}

	render = () =>  {
		return (
			<div>
				<h1>Dashboard</h1>
				<p>This is the Dashboard you have achieved reaching the Dashboard. Good Luck.</p>
			</div>
		);
	}
}

Dashboard = withRouter(Dashboard);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
