import React, { Component } from 'react';
import { Link, IndexLink, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../../common/auth/Auth.actions';

const mapStateToProps = state => ({
	lock: state.auth.lock,
	loggedIn: state.auth.idToken,
	hasSubmitted: state.form.signup.hasSubmitted
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
		this.props.router.push('/signup');
	}
	render = () => {
		let { loggedIn, hasSubmitted } = this.props;

		return (
			<nav>
				<div className="nav-fixed">
					<div className="container">
						<div className="nav-wrapper">
							<ul className="left left-name">
								<a href="#" className="brand-logo">Culture Shock</a>
							</ul>
							<ul id="nav-mobile" className="right">
								{ !loggedIn && <li><IndexLink to="/">Home</IndexLink></li> }
								{ loggedIn && <li><Link to="/signup">Getting Started</Link></li> }
								{ hasSubmitted && loggedIn && <li><Link to="/dashboard">Dashboard</Link></li> }
								{ hasSubmitted && loggedIn && <li><Link to="/profile">Profile</Link></li> }
								{ loggedIn && <li><a onClick={this.logOut}>Logout</a></li> }
								{ !loggedIn && <li><a onClick={this.logIn}>Login</a></li> }
							</ul>
						</div>
					</div>
				</div>
			</nav>
		);
	}
}

Header = withRouter(Header);
Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
