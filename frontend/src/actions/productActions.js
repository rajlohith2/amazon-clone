
import * as pl from "../constants/productConstants";
import axios from "axios";
import { headers } from "../config/userInfo";

const listProducts = () => async (dispatch) => {
    try {

        dispatch({ type: pl.PRODUCT_LIST_REQUEST });
        const { data } = await axios.get("/api/products");
        dispatch({ type: pl.PRODUCT_LIST_SUCCESS, payload: data });

    } catch(error) {
       dispatch({ type: pl.PRODUCT_LIST_FAIL, payload: error.message });     
    }
    
}
const detailsProduct = (productId) => async (dispatch) => {
try {

    dispatch({ type: pl.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get("/api/products/" + productId);
    dispatch({ type: pl.PRODUCT_DETAILS_SUCCESS, payload: data });

} catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message: error.message;
    console.error(message);
    dispatch({type: pl.PRODUCT_DETAILS_FAIL, payload: message });
}
}
 
const saveProduct = (product) => async (dispatch) => {
    try {
        dispatch({type: pl.PRODUCT_SAVE_REQUEST });
        
        if(!product._id) {
            const {data} = await axios.post("/api/products", product, headers);
            dispatch({type: pl.PRODUCT_SAVE_SUCCESS, payload: data});
            
        } else {
            
            const { data } = await axios.put(`/api/products/${product._id}`, product,headers);
            dispatch({type: pl.PRODUCT_SAVE_SUCCESS, payload: data});
            
        }

    } catch(error) {
        const message = error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({type: pl.PRODUCT_SAVE_FAIL, payload: message});
    }
}
const deleteProduct = (productId) => async(dispatch) => {
   try {
       
       dispatch({ type: pl.PRODUCT_DELETE_REQUEST, payload: productId });
       const { data } = await axios.delete(`/api/products/${productId}`, headers);
       dispatch({type: pl.PRODUCT_DELETE_SUCCESS, payload: data, success: true});
        
   } catch (error) {
       dispatch({type: pl.PRODUCT_DELETE_FAIL, payload: error.message});
   }
}
export { listProducts, detailsProduct, saveProduct, deleteProduct }; 