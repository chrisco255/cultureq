import React, { Component } from 'react';
import { Link, IndexLink, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/Auth.actions';

const mapStateToProps = state => ({
	lock: state.auth.lock,
	idToken: state.auth.idToken
});

let mapDispatchToProps = dispatch => ({
	onLogOut: () => dispatch(logout())
});

class Header extends Component {
	logIn = () => {
		this.props.lock.show();
	}
	logOut = () => {
		this.props.onLogOut();
		this.props.router.push('/');
	}
	render = () => {
		let { idToken } = this.props;

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
								{ idToken && <li><a onClick={this.logOut}>Logout</a></li> }
								{ !idToken && <li><a onClick={this.logIn}>Login</a></li> }
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