import React from 'react';
import { Link, IndexLink, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../action_creators';

const mapStateToProps = state => ({
    lock: state.lock,
    idToken: state.idToken
});


let mapDispatchToProps = dispatch => ({
    onLogOut: () => dispatch( logout() )
});

let Header = React.createClass({
    logOut() {
        this.props.onLogOut();
        this.props.router.push('/');
    },
    render() {
        return (
            <div>
                <ul>
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><Link to="/signup">Sign Up</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
                <div className="login-box">
                    <a onClick={this.props.onLogOut}>Logout</a>
                </div>
            </div>
        );
    }
});
Header = withRouter(Header);
export default connect(mapStateToProps, mapDispatchToProps)(Header);