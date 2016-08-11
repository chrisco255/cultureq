import React, { Component } from 'react';
import { Link, IndexLink } from 'react-router';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import { logout, login } from '../../reducers/user/User.actions';
import styles from './Header.component.css';
import CultureLogo from '../../assets/images/culture-logo.svg';

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
	{ path: 'pillar', label: 'pillar management'},
	{ path: 'quests', label: 'Quest Creation'},
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
			this.props.redirect('/');
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
				<div className="navbar-fixed">
					<nav styleName="top-navbar">
						<div>
							<div styleName="flex-container">
								<div styleName="logo-container">
		     					<img styleName="brand-logo" src={CultureLogo} />
									<div styleName="brand-title">
										<IndexLink to="/">CultureQ</IndexLink>
									</div>
								</div>
								<div styleName="welcome-message">
									{loggedIn && `Welcome '${THECompanyName}'`}
									{!loggedIn && <button className="btn-flat white-semi-transparent-text" onClick={this.logIn}>LOGIN</button>}
								</div>
							</div>
						</div>
					</nav>
				</div>
				{loggedIn && <div className="navbar-fixed">
					<nav styleName="bottom-navbar">
						<div styleName="bottom-navbar-fixed">
							<div styleName="flex-container">
								<div styleName="nav-items">
									<ul>
										{routes.map( route => {
												const isActive = (location.pathname === route.path);
												const className = isActive ? 'active-item' : '';
												if(route.isIndex) {
													return (<li key={route.path} styleName={className}><IndexLink to={route.path}>{route.label}</IndexLink></li>);
												} else {
													return (<li key={route.path} styleName={className}><Link to={route.path}>{route.label}</Link></li>);
												}
										})}
									</ul>
								</div>
								{loggedIn && <div><button className="btn-flat white-semi-transparent-text" onClick={this.logOut}>LOGOUT</button></div>}
							</div>
						</div>
					</nav>
    		</div>}
			</div>
		);
	}
}

Header = CSSModules(Header, styles);
Header = connect(mapStateToProps, mapDispatchToProps)(Header);
export default Header;
