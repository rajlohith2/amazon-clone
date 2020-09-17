
import * as pl from "../constants/productConstants";
import axios from "axios";

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
    dispatch({type: pl.PRODUCT_DETAILS_FAIL, payload: error.message });
}
}
 
const saveProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({type: pl.PRODUCT_SAVE_REQUEST });
        const { userSignin: { userInfo} } =  getState();
        if(!product._id) {
            const {data} = await axios.post("/api/products", product,{
                headers: {
                    'Authorization': 'Bearer '+ userInfo.token
                }
            });
            dispatch({type: pl.PRODUCT_SAVE_SUCCESS, payload: data});

        } else {
            const { data } = await axios.put(`/api/products/${product._id}`, product,{
                headers: {
                    'Authorization': 'Bearer '+ userInfo.token
                }
            });
            dispatch({type: pl.PRODUCT_SAVE_SUCCESS, payload: data});
        }

    } catch(error) {
        dispatch({type: pl.PRODUCT_SAVE_FAIL, payload: error.message});
    }
}
const deleteProduct = (productId) => async(dispatch, getState) => {
   try {
       const { userSignin: {userInfo} } = getState();
       dispatch({ type: pl.PRODUCT_DELETE_REQUEST, payload: productId });
       const { data } = await axios.delete(`/api/products/${productId}`,{
           headers: {
               Authorization: 'Bearer '+ userInfo.token
           }
       });
       dispatch({type: pl.PRODUCT_DELETE_SUCCESS, payload: data, success: true});
       
   } catch (error) {
       dispatch({type: pl.PRODUCT_DELETE_FAIL, payload: error.message});
   }
}
export { listProducts, detailsProduct, saveProduct, deleteProduct }; 