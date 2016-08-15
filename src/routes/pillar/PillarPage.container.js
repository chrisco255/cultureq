import React, { Component } from 'react';
import { connect } from 'react-redux';
import CSSModules from 'react-css-modules';
import PillarPageStyles from './PillarPage.css';
import { Link } from 'react-router';
import { createPillar, deletePillar, editPillar, nameChangePillar, fetchPillars } from '../../reducers/pillar/Pillar.actions';
import PillarForm from './pillar_form/PillarForm.component';

const query = `
{
  pillars {
    _id
    tenantId
    name
    isDeleted
    content {
      _id
    }
  }
}
`;

const mapDispatchToProps = (dispatch) => {
	return {
		createPillar: (pillar) =>
			dispatch(createPillar(pillar)),
		deletePillar: (pillar) =>
		 	dispatch(deletePillar(pillar)),
		editPillar: (pillar, index) =>
			dispatch(editPillar(pillar, index)),
		nameChangePillar: (pillar, index) =>
			dispatch(nameChangePillar(pillar, index)),
		onLoad: () =>
			dispatch(fetchPillars({ query }))
	};
};

const mapStateToProps = (state) => {
	return {
		pillars: state.pillar.pillars,
		isEditing: state.pillar.isEditing,
		pillarThatIsBeingEdited: state.pillar.pillarThatIsBeingEdited,
		pillarThatIsBeingEditedIndex: state.pillar.pillarThatIsBeingEditedIndex
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
		this.props.nameChangePillar(this.refs.pillarThatIsBeingEditedInput.value, this.props.pillarThatIsBeingEditedIndex);
	}

	render() {

		let listPillars = null;
    let createPillarsListClassName = null;
    let activePillars = null;

    activePillars = this.props.pillars.filter((pillar) => !pillar.isDeleted);

		if(activePillars.length > 0) {
      createPillarsListClassName = 'col s6';
			listPillars = this.props.pillars.map((pillar, index) => {
        if(!pillar.isDeleted) {
          if (this.props.isEditing && index === this.props.pillarThatIsBeingEditedIndex) {
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
              <span className="hand" onClick={this.props.editPillar.bind(this, pillar, index)}>
  						{pillar.name}
              </span>
  						<div className="secondary-content hand primary-dark-text" onClick={this.props.deletePillar.bind(this, pillar)}>
  							<i className="material-icons">delete</i>
  						</div>
  					</a>
  				);
        }
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
            {/*<div className="container" styleName="flex-space-between">
              <div>
                <Link className="btn waves-effect white black-text" to="/dashboard">Skip</Link>
              </div>
              <div>
                <Link className="waves-effect waves-light btn accent-background" to="/content"><i className="material-icons right">play_arrow</i>Continue</Link>
              </div>
            </div>*/}
          </div>

					{ activePillars.length > 0 && <div className="col s6">
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
