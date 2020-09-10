
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
    const { data } = await axios.get("/api/product/" + productId);
    dispatch({ type: pl.PRODUCT_DETAILS_SUCCESS, payload: data });

} catch (error) {
    dispatch({type: pl.PRODUCT_DETAILS_FAIL, payload: error.message });
}

}
export { listProducts, detailsProduct }; 