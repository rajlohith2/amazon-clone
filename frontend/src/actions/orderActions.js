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
        //localStorage.removeItem("shipping");
    } catch (error) {
        dispatch({type: oc.ORDER_CREATE_FAIL, 
        payload: error.response && error.response.message? error.response.message: error.message});
    }
}
export const detailsOrder = (orderId)=> async(dispatch, getState)=>{
    dispatch({type: oc.ORDER_DETAILS_REQUEST, payload: orderId});
    try {        
        const { data } = await axios.get(`/api/orders/${orderId}`, headers);        
        dispatch({ type: oc.ORDER_DETAILS_SUCCESS, payload: data });       

    } catch (error) {
       
        const message = error.response && error.response.data.message ? 
        error.response.data.message: 
        error.message;
        dispatch({type:oc.ORDER_DETAILS_FAIL, payload:message});
    }  
}
export const payOrder = (order, paymentResult) => async(dispatch) => {
    dispatch({type: oc.ORDER_PAY_REQUEST, payload: {order, paymentResult } } );
   
    try {
        const { data } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, headers);
        dispatch({type: oc.ORDER_PAY_SUCCESS, payload: data});
        console.log(data);
        
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({type:oc.ORDER_PAY_FAIL, payload: message});
    }
} 
export const listMyOrders = () => async(dispatch) => {
    dispatch({type: oc.ORDER_MINE_LIST_REQUEST });
    try {
        const {data } = await axios.get('/api/orders/client/orders', headers);
        dispatch({type: oc.ORDER_MINE_LIST_SUCCESS, payload: data});
        
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({type:oc.ORDER_MINE_LIST_FAIL, payload: message});

    } 
}
export const listAllOrders = ({seller = ''}) => async(dispatch) => {
    dispatch({type: oc.ORDER_LIST_REQUEST});
    try {
        const { data } = await axios.get(`/api/orders?seller${seller}`, headers);
        dispatch({type: oc.ORDER_LIST_SUCCESS, payload: data});
        
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type:oc.ORDER_LIST_FAIL, payload: message});
    }
}
export const deleteOrder = (orderId) => async(dispatch) => {
   dispatch({type: oc.ORDER_DELETE_REQUEST, payload: orderId});
    try {
        //console.log('it rerenders automatically');
        const { data } = await axios.delete(`/api/orders/${orderId}`, headers);
        dispatch({type: oc.ORDER_DELETE_SUCCESS, payload: data });
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message;
        dispatch({type:oc.ORDER_DELETE_FAIL, payload: message });
    }
}

export const deliverOrder = (orderId) => async(dispatch) => {
    dispatch({type: oc.ORDER_DELIVER_REQUEST, payload: orderId } );
    try {
        const { data } = await axios.put(`/api/orders/${orderId}/deliver`, headers);
        dispatch({type: oc.ORDER_DELIVER_SUCCESS, payload: data});
        
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({type:oc.ORDER_DELIVER_FAIL, payload: message});
    }
} 