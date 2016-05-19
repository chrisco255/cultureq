import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';

let SignUpForm = React.createClass({
    render() {
        const { fields: { companyName, address }, handleSubmit } = this.props;
        return (
            <div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Company Name</label>
                        <input type="text" placeholder="Company Name" { ...companyName } />
                    </div>
                    <br/>
                    <div>
                        <label>Address</label>
                        <input type="text" placeholder="Address" { ...address } />
                    </div>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    }
});

// Composition FTW!
SignUpForm = reduxForm({ form: 'signup', fields: ['companyName', 'address'] })(SignUpForm);

export default SignUpForm;
