import {  createStore, combineReducers, applyMiddleware, compose } from "redux";
import  thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducer';
import {  cartReducer } from "./reducers/cartReducers";
import  {userSigninReducer, UserRegisterReducer, updateProfileReducer}  from './reducers/userSigninReducer';
import { myOrdersReducer, orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderPayReducer, ordersListReducer } from "./reducers/orderReducers";
import { profileReducer } from "./reducers/userDetailsReducers";

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const userInfo = JSON.parse(localStorage.getItem('userInfo')) || null;
// const shippingAddress = JSON.parse(localStorage.getItem('shipping')) || null;
const shippingAddress = localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')): {};

 const initialState = { cart: { cartItems, payment: 'Paypal', shippingAddress }, userSignin: { userInfo }};
  
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userSignin: userSigninReducer,
    userRegister: UserRegisterReducer,
    productSave: productSaveReducer,
    productDelete: productDeleteReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    myOrders: myOrdersReducer,
    userProfile: profileReducer,
    userProfileUpdate: updateProfileReducer,
    orderslist: ordersListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver:orderDeliverReducer

  

});

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;