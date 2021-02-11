import {  createStore, combineReducers, applyMiddleware, compose } from "redux";
import  thunk from 'redux-thunk';
import { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer } from './reducers/productReducer';
import {  cartReducer } from "./reducers/cartReducers";
import  {userSigninReducer, UserRegisterReducer }  from './reducers/userSigninReducer';
import { myOrdersReducer, orderCreateReducer, orderDetailsReducer, orderPayReducer } from "./reducers/orderReducers";

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const userInfo = JSON.parse(localStorage.getItem('userInfo')) || [];
const shippingAddress = JSON.parse(localStorage.getItem('shipping')) || [];

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
    myOrders: myOrdersReducer

});

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;