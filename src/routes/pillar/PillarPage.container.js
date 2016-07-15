import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import PillarPageStyles from './PillarPage.css';
import { Link, IndexLink } from 'react-router';
import _ from 'lodash';
import { createPillar, deletePillar, editPillar, nameChangePillar } from '../../reducers/pillar/Pillar.actions';
import PillarForm from './pillar_form/PillarForm.component';

const mapDispatchToProps = (dispatch) => {
	return {
		createPillar: (pillar) =>
			dispatch(createPillar(pillar)),
		deletePillar: (pillar) =>
		 	dispatch(deletePillar(pillar)),
		editPillar: (pillar, index) =>
			dispatch(editPillar(pillar, index)),
		nameChangePillar: (pillar, index) =>
			dispatch(nameChangePillar(pillar, index))
	}
}

const mapStateToProps = (state) => {
	return {
		pillars: state.pillar.pillars,
		selectedPillars: state.pillar.selectedPillars,
		isEditing: state.pillar.isEditing,
		pillarThatIsBeingEdited: state.pillar.pillarThatIsBeingEdited,
		pillarThatIsBeingEditedIndex: state.pillar.pillarThatIsBeingEditedIndex
	}
}

class PillarPage extends Component {

	onPillarSubmit = (values, dispatch) => {
		dispatch( createPillar(values) );
	}

	onEditSubmit = (event) => {
		event.preventDefault();
		this.props.nameChangePillar(this.refs.pillarThatIsBeingEditedInput.value, this.props.pillarThatIsBeingEditedIndex);
	}

	render() {

		var listPillars = null;
		var listSelectedPillars = null;
		var inputFieldEditPillar = null;

		if(this.props.pillars.length < 1) {
			listPillars = (
				<div className="collection-item">
					There are no more pillars to select. Create new ones!
				</div>
			);
		} else {
			listPillars = this.props.pillars.map((pillar, index) => {

				if (this.props.isEditing && index === this.props.pillarThatIsBeingEditedIndex) {
					return (
						<form key={pillar._id} onSubmit={this.onEditSubmit}>
							<div className="input-field" styleName="edit-input-field">
				   			<input ref="pillarThatIsBeingEditedInput" defaultValue={pillar.name} type="text" class="validate" onBlur={this.onEditSubmit} />
				   		</div>
						</form>
					);
				}

				return (
					<a className="collection-item" key={pillar._id} >
						{pillar.name}
						<div className="secondary-content hand" onClick={this.props.createPillar.bind(this, pillar)}>
							<i className="material-icons">add_circle</i>
						</div>
						<div className="secondary-content hand" onClick={this.props.editPillar.bind(this, pillar, index)}>
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
			listSelectedPillars = this.props.selectedPillars.map( (pillar) => {
				return (
					<a className="collection-item hand" key={pillar._id} >
						{pillar.name}
						<div className="secondary-content" onClick={this.props.deletePillar.bind(this, pillar)}>
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
								<Link className="waves-effect waves-light btn" to="/content">Continue</Link>
							</div>
      			</div>
			    </div>
				</div>
		);
	}

}

PillarPage = CSSModules(PillarPage, PillarPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (PillarPage);
