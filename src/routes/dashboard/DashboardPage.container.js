import React, { Component } from 'react';
import HeroImage from './hero_image/HeroImage.component';
import { connect } from 'react-redux';
import { joinRoom, leaveRoom } from '../../socket/configureSocket';
import { socketJoinRoom, socketLeaveRoom } from '../../reducers/socket/Socket.actions';
import { Link } from 'react-router';

const mapDispatchToProps = (dispatch) => ({
	dispatchJoinRoom: (roomName) => {
		joinRoom(roomName);
		return dispatch( socketJoinRoom(roomName) );
	},
	dispatchLeaveRoom: (roomName) => {
		leaveRoom(roomName);
		dispatch( socketLeaveRoom(roomName) )
 	}
})

export class DashboardPage extends Component {
	componentDidMount() {
		this.props.dispatchJoinRoom('dashboard');
	}

	componentWillUnmount() {
		this.props.dispatchLeaveRoom('dashboard');
	}

	render() {
		return (
			<div className="container">
				<HeroImage />
				<h1>Dashboard</h1>
				<Link to="/company/import"> import </Link>
				<p>This is the Dashboard you have achieved reaching the Dashboard. Good Luck.</p>
			</div>
		);
	}
}

export default connect(null, mapDispatchToProps) (DashboardPage);
