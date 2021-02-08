import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState)=> {
    try {
        const { data } = await axios.get('/api/products/' + productId);
        dispatch({
            type:CART_ADD_ITEM, payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        });
    
        //saving cart items in cookie so that I can see them when I refresh the page
        const {cart: {cartItems}} = getState();
        
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem('userInfo', JSON.stringify(data));   

    
    } catch (error) {
        console.log(error.message); 
    }
}
const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart: {cartItems } } = getState();
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data });
    localStorage.setItem("shipping", JSON.stringify(data));
}
const savePayment = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_PAYMENT, payload: data});
}
export { addToCart, removeFromCart, saveShipping, savePayment };