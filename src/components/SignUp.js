import React from 'react';


let SignUp = React.createClass({
	getInitialState() {
		return {
			companyName: '',
			address: ''
		}
	},

	handleSubmit(event) {
		event.preventDefault();
		console.log(this.state.companyName);
		console.log(this.state.address);
	},

	handleChangeCompanyName(event) {
		this.setState({ companyName: event.target.value });
	},

	handleChangeAddress(event) {
		this.setState({ address: event.target.value });
	},

	render() {
		return (
			<div>
				<h1>Complete This form to sign up!</h1>

				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Company Name" value={this.state.companyName} onChange={this.handleChangeCompanyName} />
					<br/>
					<br/>
					<input type="text" placeholder="address" value={this.state.address} onChange={this.handleChangeAddress} />
					<br/>
					<br/>
					<input type="submit" />
				</form>
			</div>
		);
	}
});

export default SignUp;
