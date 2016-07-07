import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import PillarPageStyles from './PillarPage.css';
import { Link, IndexLink } from 'react-router';
import _ from 'lodash';
import { addPillar, removePillar, addPillarList } from '../../reducers/pillar/Pillar.actions';
import PillarForm from './pillar_form/PillarForm.component';

const mapDispatchToProps = (dispatch) => {
	return {
		addPillar: (pillar) =>
			dispatch(addPillar(pillar)),
		removePillar: (pillar) =>
		 	dispatch(removePillar(pillar)),
		addPillarList: (pillars) =>
			dispatch(addPillarList(pillars))
	}
}

const mapStateToProps = (state) => {
	return {
		pillars: state.pillar.pillars,
		selectedPillars: state.pillar.selectedPillars
	}
}

class PillarPage extends Component {

	onPillarSubmit = (values, dispatch) => {
		console.log('ADD PILLAR', values);
		dispatch( addPillar(values) );
	}

	submitPillarList = () => {
		console.log('CONTINUE', this.props.selectedPillars);
		this.props.addPillarList(this.props.selectedPillars);
	}

	render() {

		var listPillars = null;
		var listSelectedPillars = null;

		if(this.props.pillars.length < 1) {
			listPillars = (
				<div className="collection-item">
					There are no more pillars to select. Create new ones!
				</div>
			);
		} else {
			listPillars = this.props.pillars.map((pillar) => {
					return (
						<a className="collection-item hand" key={pillar.name} >
							{pillar.name}
							<div className="secondary-content" onClick={this.props.addPillar.bind(this, pillar)}>
								<i className="material-icons">add_circle</i>
							</div>
							<div className="secondary-content">
								<i className="material-icons">mode_edit</i>
							</div>
						</a>

					);
			});
		}

		if(this.props.selectedPillars.length < 1) {
			listSelectedPillars = (
				<div className="collection-item">
					You have not selected any pillars!
				</div>
			);
		} else {
			listSelectedPillars = this.props.selectedPillars.map((pillar) => {
				return (
					<a className="collection-item hand" key={pillar.name} >
						{pillar.name}
						<div className="secondary-content" onClick={this.props.removePillar.bind(this, pillar)}>
							<i className="material-icons">delete</i>
						</div>
					</a>
				);
			});
		}

		return (
				<div className="row">
					<div className="col s3" styleName="side-bar">
						<div className="container">
		    			<h1 styleName="title">Selected Pillars</h1>
							<hr/>
							<div>
					 			<div className="collection">
					 			 {listSelectedPillars}
					 			</div>
				 		 </div>
	    			</div>
					</div>
					<div className="col s9">
						<div className="container">
							<h1 styleName="title">Choose Your Cultural Pillars</h1>
							<hr/>
							<div>
					 			<div className="collection">
					 			 {listPillars}
					 			</div>
				 		 </div>
						</div>
						<div className="container">
	      			<PillarForm onSubmit={this.onPillarSubmit}/>
      			</div>
						<br />
						<br />
						<div className="container" styleName="flex-space-between">
							<div>
								<Link className="waves-effect waves-light btn" to="/dashboard">Skip</Link>
							</div>
							<div>
								<button className="waves-effect waves-light btn" onClick={this.submitPillarList}>Continue</button>
							</div>
      			</div>
			    </div>
				</div>
		);
	}

}

PillarPage = CSSModules(PillarPage, PillarPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (PillarPage);