import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import PillarPageStyles from './PillarPage.css';
import { createPillar, deletePillar, editPillar, nameChangePillar, fetchPillars } from '../../reducers/pillar/Pillar.actions';
import PillarForm from './pillar_form/PillarForm.component';
import pillarQuery from './PillarQuery';

const mapDispatchToProps = (dispatch) => {
	return {
		createPillar: (pillar) =>
			dispatch(createPillar(pillar)),
		deletePillar: (pillar) =>
		 	dispatch(deletePillar(pillar)),
		editPillar: (pillar) =>
			dispatch(editPillar(pillar)),
		nameChangePillar: (_id, pillarName) =>
			dispatch(nameChangePillar(_id, pillarName)),
		onLoad: () =>
			dispatch(fetchPillars({ query:pillarQuery }))
	};
};

const mapStateToProps = (state) => {
	return {
		pillars: state.pillar.pillars,
		isEditing: state.pillar.isEditing,
		pillarThatIsBeingEdited: state.pillar.pillarThatIsBeingEdited
	};
};

class PillarPage extends Component {

	componentDidMount() {
		this.props.onLoad();
	}

	onPillarSubmit = (values, dispatch) => {
		dispatch( createPillar(values) );
	}

	onEditSubmit = (event) => {
		event.preventDefault();
		this.props.nameChangePillar(this.props.pillarThatIsBeingEdited._id, this.refs.pillarThatIsBeingEditedInput.value);
	}

	render() {

		let listPillars = null;
    let createPillarsListClassName = null;

		if(this.props.pillars.length > 0) {
      createPillarsListClassName = 'col s6';
			listPillars = this.props.pillars.map((pillar) => {
          if (this.props.isEditing && pillar._id === this.props.pillarThatIsBeingEdited._id) {
  					return (
  						<form key={pillar._id} onSubmit={this.onEditSubmit}>
  							<div className="input-field" styleName="edit-input-field">
  				   			<input ref="pillarThatIsBeingEditedInput" defaultValue={pillar.name} type="text" className="validate" onBlur={this.onEditSubmit} />
  				   		</div>
  						</form>
  					);
  				}

  				return (
  					<a className="collection-item black-text" key={pillar._id}>
              <span className="hand" onClick={this.props.editPillar.bind(this, pillar)}>
  						{pillar.name}
              </span>
  						<div className="secondary-content hand primary-dark-text" onClick={this.props.deletePillar.bind(this, pillar)}>
  							<i className="material-icons">delete</i>
  						</div>
  					</a>
  				);
			});
		} else {
      createPillarsListClassName = 'col s12';
    }

		return (
      <div className="container">
				<div className="row">
          <div className={createPillarsListClassName}>
            <div className="container">
              <PillarForm onSubmit={this.onPillarSubmit}/>
            </div>
            <br/>
          </div>

					{ this.props.pillars.length > 0 && <div className="col s6">
						<div className="container">
							<h1>Your Cultural Pillars</h1>
							<hr/>
							<div>
					 			<div className="collection">
					 			 {listPillars}
					 			</div>
				 		 </div>
						</div>
						<br />
						<br />
			    </div> }
				</div>
      </div>
		);
	}

}

PillarPage = CSSModules(PillarPage, PillarPageStyles);
export default connect(mapStateToProps, mapDispatchToProps) (PillarPage);
