import {  createStore, combineReducers, applyMiddleware, compose } from "redux";
import  thunk from 'redux-thunk';
import Cookie from 'js-cookie';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducer';
import {  cartReducer } from "./reducers/cartReducers";
import  {userSigninReducer, UserRegisterReducer }  from './reducers/userSigninReducer';

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

 const initialState = { cart: { cartItems }, userSignin: { userInfo } };
  
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: UserRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer

});

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;