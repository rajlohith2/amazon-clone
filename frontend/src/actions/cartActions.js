import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT, CART_ADD_ITEM_FAIL } from "../constants/cartConstants";

const addToCart = (productId, qty) => async (dispatch, getState)=> {
    try {
        const { data } = await axios.get('/api/products/' + productId);
        const {cart: { cartItems } } = getState();   
        
        if(cartItems.length > 0 && data.seller._id !== cartItems[0].seller._id ){
           
            dispatch({ type:CART_ADD_ITEM_FAIL,
                 payload:`Can't Add To Cart. Buy from ${cartItems[0].seller.seller.name} in this order`});
        }else {
            dispatch({
                type:CART_ADD_ITEM, payload: {
                    product: data._id,
                    name: data.name,
                    image: data.image,
                    price: data.price,
                    countInStock: data.countInStock,
                    seller: data.seller,
                    qty
                }
            });
        }
        localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));         

    } catch (error) {
        console.log(error.message); 
        const message = error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({type:CART_ADD_ITEM_FAIL, payload: message});
    }
}
const removeFromCart = (productId) => async (dispatch, getState) => {
    dispatch({type: CART_REMOVE_ITEM, payload: productId});

    const {cart: {cartItems } } = getState();
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
const saveShipping = (data) => (dispatch) => {
    dispatch({type: CART_SAVE_SHIPPING, payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
}
const savePayment = (data) => (dispatch) => {    
    dispatch({type: CART_SAVE_PAYMENT, payload: data});
}
export { addToCart, removeFromCart, saveShipping, savePayment };