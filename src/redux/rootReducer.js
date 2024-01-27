import { combineReducers } from 'redux';

import { reducer as authReducer } from './auth';
import { reducer as crudReducer } from './crud';
import { reducer as erpReducer } from './erp';
import { reducer as adavancedCrudReducer } from './adavancedCrud';
import { reducer as settingsReducer } from './settings';
import { reducer as translateReducer } from './translate';
import {reducer as cartReducer} from './card'
import {reducer as productReducer} from './product'
import {reducer as productsApi} from './productApilink'
import {reducer as userorderformReducer} from './orderuserdetails'
// Combine all reducers.

const rootReducer = combineReducers({
  auth: authReducer,
  crud: crudReducer,
  erp: erpReducer,
  adavancedCrud: adavancedCrudReducer,
  settings: settingsReducer,
  translate: translateReducer,
  cart:cartReducer,
  products:productReducer,
  productsApi:productsApi,
  userorderformReducer: userorderformReducer
  //  [productsApi.reducerPath]:productsApi.reducer,
},
);

export default rootReducer;
