import React from 'react';
import { IndexLink } from 'react-router';

export default (props) => {
	return (
		<div>
			<IndexLink to="/">Home</IndexLink>
			<h1>Sign Up Today!</h1>
		</div>
	);
};
