import React, { Component } from 'react';
import { Link, IndexLink, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/Auth.actions';

const mapStateToProps = state => ({
	lock: state.lock,
	idToken: state.idToken
});

let mapDispatchToProps = dispatch => ({
	onLogOut: () => dispatch(logout())
});

class Header extends Component {
	logOut = () => {
		this.props.onLogOut();
		this.props.router.push('/');
	}
	render = () => {
		return (
			<nav>
				<div className="nav-fixed">
					<div className="container">
						<div className="nav-wrapper">
							<ul className="left left-name">
								<a href="#" className="brand-logo">Culture Shock</a>
							</ul>
							<ul id="nav-mobile" className="right">
								<li><IndexLink to="/">Home</IndexLink></li>
								<li><Link to="/signup">Sign Up</Link></li>
								<li><Link to="/dashboard">Dashboard</Link></li>
								<li><a onClick={this.props.onLogOut}>Logout</a></li>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

Header = withRouter(Header);
export default connect(mapStateToProps, mapDispatchToProps)(Header);