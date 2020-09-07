
import * as pl from "../constants/productConstants";
import axios from "axios";

const listProducts = () => async (dispatch) => {
    try {

        dispatch({ type: pl.PRODUCT_LIST_REQUEST});
        const { data } = await axios.get("/api/products");
        dispatch({ type: pl.PRODUCT_LIST_SUCCESS, payload: data});

    } catch(error) {
       dispatch({ type: pl.PRODUCT_LIST_FAIL, payload: error.message });     
    }
    
}
export { listProducts }; 