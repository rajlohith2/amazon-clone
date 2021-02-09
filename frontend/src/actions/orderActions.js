import * as oc from "../constants/OrderConstants";
import { CART_EMPTY } from "../constants/cartConstants";
import axios from "axios"; 
export const createOrder = (order)=> async(dispatch, getState) => {
    dispatch({type: oc.ORDER_CREATE_REQUEST,  payload: order});
    try {
        const {userSignin: {userInfo}} = getState();       
        const { data } = await axios.post(`/api/orders`, order, {headers: {Authorization: `Bearer ${userInfo.token}`},});
        dispatch({type: oc.ORDER_CREATE_SUCCESS, payload: data.order});
        dispatch({type: CART_EMPTY});
        localStorage.removeItem("cartItems");
    } catch (error) {
        dispatch({type: oc.ORDER_CREATE_FAIL, 
        payload: error.response && error.response.message? error.response.message: error.message});
    }
}