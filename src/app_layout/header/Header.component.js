import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { logout, login } from '../../reducers/user/User.actions';

const mapStateToProps = function mapStateToProps(state) {
	console.log('HEADER STATE: ', state);
	return {
		lock: state.user.lock,
		loggedIn: state.user.token,
		companyName: state.company.name
	};
}

let mapDispatchToProps = dispatch => ({
  onLogIn(payload) { dispatch( login(payload) )},
	onLogOut() { dispatch( logout() )},
	redirect(url) { dispatch( push(url) ) }
});

class Header extends Component {
	logIn = () => {
		this.props.lock.show( (err, profile, token) => {
      if(err) {
        console.log('Login Failed: ',err);
        return;
      }

      try {
        window.localStorage.setItem('userToken', token);
        window.localStorage.setItem('userProfile', JSON.stringify(profile));
      } catch(err) {
        console.log(err);
      }

      this.props.onLogIn({ token, profile });
    });
	}
	logOut = () => {
		this.props.onLogOut();
		this.props.redirect('/');
	}
	render = () => {
		let { loggedIn, companyName } = this.props;
		console.log('companyName', companyName);

		return (
			<nav>
				<div className="nav-fixed">
					<div className="container">
						<div className="nav-wrapper">
							<ul className="left left-name">
								<IndexLink to="/" className="brand-logo">Culture Shock</IndexLink>
							</ul>
							<ul id="nav-mobile" className="right">
								{ !companyName && loggedIn && <li><Link to="/company">Getting Started</Link></li> }
								{ companyName && loggedIn && <li><Link to="/dashboard">Dashboard</Link></li> }
								{ companyName && loggedIn && <li><Link to="/profile">Profile</Link></li> }
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

Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
