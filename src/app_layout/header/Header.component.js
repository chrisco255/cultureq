import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { logout, login } from '../../reducers/user/User.actions';
import styles from './Header.component.css';
import KometLogo from '../../assets/images/komet-logo.svg';

const mapStateToProps = (state) => ({
		lock: state.user.lock,
		loggedIn: state.user.token,
		companyName: state.company.name
});

const mapDispatchToProps = dispatch => ({
  onLogIn(payload) { dispatch( login(payload) );},
	onLogOut() { dispatch( logout() ); },
	redirect(url) { dispatch( push(url) ); }
});

const routes = [
	{ path: '/', label: 'home', isIndex: true},
	{ path: 'analytics', label: 'analytics'},
	{ path: 'content', label: 'content management'},
];

class Header extends Component {
	logIn = () => {
		this.props.lock.show( (err, profile, token) => {
      if(err) {
        console.log('Login Failed: ', err);
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
	render() {
		const { loggedIn, location, companyName } = this.props;

		const THECompanyName = companyName || 'Ultimate Software';

		return (
			<div>
				<nav styleName="top-navbar">
					<div className="nav-fixed">
						<div styleName="flex-container">
							<div styleName="logo-container">
	     					<img styleName="brand-logo" src={KometLogo} />
								<div styleName="brand-title">
									<IndexLink to="/">Komet</IndexLink>
								</div>
							</div>
							<div styleName="welcome-message">
								{`Welcome '${THECompanyName}'`}
							</div>
						</div>
					</div>
				</nav>
				<nav styleName="bottom-navbar">
					<div className="nav-fixed" styleName="bottom-navbar-fixed">
						<div styleName="flex-container">
							<div styleName="nav-items">
								<ul>
									{loggedIn && routes.map( route => {
											const isActive = (location.pathname === route.path);
											const className = isActive ? 'active-item' : '';
											if(route.isIndex) {
												return (<li key={route.path} styleName={className}><IndexLink to={route.path}>{route.label}</IndexLink></li>);
											} else {
												return (<li key={route.path} styleName={className}><Link to={route.path}>{route.label}</Link></li>);
											}
									})}
								</ul>
								{/* { !companyName && loggedIn && <li><Link to="/company">Getting Started</Link></li> }
								{ companyName && loggedIn && <li><Link to="/dashboard">Dashboard</Link></li> }
								{ companyName && loggedIn && <li><Link to="/profile">Profile</Link></li> }
								{ loggedIn && <li><a onClick={this.logOut}>Logout</a></li> }
								{ !loggedIn && <li><a onClick={this.logIn}>Login</a></li> } */}
							</div>
						</div>
					</div>
				</nav>
			</div>
		);
	}
}

Header = CSSModules(Header, styles);
Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
