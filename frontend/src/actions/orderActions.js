import * as oc from "../constants/OrderConstants";
import { CART_EMPTY } from "../constants/cartConstants";
import axios from "axios"; 
import { headers } from "../config/userInfo";
export const createOrder = (order)=> async(dispatch, getState) => {
    dispatch({type: oc.ORDER_CREATE_REQUEST,  payload: order});
    try {
        const {userSignin: {userInfo}} = getState();       
        const { data } = await axios.post(`/api/orders`,order, {headers: {Authorization: `Bearer ${userInfo.token}`},});
        dispatch({type: oc.ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({type: CART_EMPTY});
        localStorage.removeItem("cartItems");
        localStorage.removeItem("shipping");
    } catch (error) {
        dispatch({type: oc.ORDER_CREATE_FAIL, 
        payload: error.response && error.response.message? error.response.message: error.message});
    }
}
export const detailsOrder = (orderId)=> async(dispatch, getState)=>{
    dispatch({type: oc.ORDER_DETAILS_REQUEST, payload: orderId});
    try {
        //after using getState I will use variable headers defined in user infor file
        const {userSignin: {userInfo}} = getState();
        const { data } = await axios.get(`/api/orders/${orderId}`, {headers: {Authorization: `Bearer ${userInfo.token}`},});        
        dispatch({ type: oc.ORDER_DETAILS_SUCCESS, payload: data });       

    } catch (error) {
       
        const message = error.response && error.response.data.message ? 
        error.response.data.message: 
        error.message;
        dispatch({type:oc.ORDER_DETAILS_FAIL, payload:message});
    }
}