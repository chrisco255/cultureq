import user from './user/User.reducer.js';
import companyForm from './form/company/CompanyForm.reducer';
import company from './company/Company.reducer';
import product from './product/Product.reducer';
import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

/*
	NOTE: The hierarchy of the reducers folder should reflect the structure of the reducers object below
 */
const reducers = {
	user,
	routing,
	company,
	product,
	form: formReducer.plugin({
		company: companyForm
	})
};

export default combineReducers(reducers);

//playground
// import { createValidator, required, minLength, integer, unique } from './../common/validations';

// const testValidation = createValidator({
// 	name: [required],
// 	address: [required],
// 	contact: {
// 		name: [required],
// 		friend: {
// 			name: [required, unique],
// 			phone: [required]
// 		}
// 	}
// });

// const testObject = {
// 	name: 'bob',
// 	address: 'addr',
// 	contact: {
// 		name: 'joe',
// 		// friend: {
// 		// 	name: 'sue',
// 		// 	phone: 5
// 		// }
// 	}
// }

// const testCollection = [
// {
// 	name: 'mary',
// 	address: 'addr',
// 	contact: {
// 		name: 'joe',
// 		friend: {
// 			name: 'sue',
// 			phone: 5
// 		}
// 	}
// },
// {
// 	name: 'bob',
// 	address: 'addr',
// 	contact: {
// 		name: 'joe',
// 		friend: {
// 			name: 'mary',
// 			phone: 5
// 		}
// 	}
// }
// ];

// const errors = testValidation(testObject, testCollection);
// console.log("Errors - ", errors);