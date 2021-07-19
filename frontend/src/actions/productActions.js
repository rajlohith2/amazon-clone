
import * as pl from "../constants/productConstants";
import axios from "axios";
import { headers } from "../config/userInfo";
import { PROD_URL } from "../config/shipping";

const listProducts = ({seller = '', name='', category='', min=0, max=0, rating=0, order='', pageNumber=''}) => async (dispatch) => {
    try {
        
        dispatch({ type: pl.PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`https://jz-amazona.herokuapp.com/api/products`);
        // const { data } = await axios.get(`${PROD_URL}/products?pageNumber=${pageNumber}&&seller=${seller}&&name=${name}&&category=${category}&&min=${min}&&max=${max}&&rating=${rating}/order/${order}`);
        alert(data.products);
        dispatch({ type: pl.PRODUCT_LIST_SUCCESS, payload: data });
       
    } catch(error) {
       const message = error.response && error.response.data.message ? error.response.data.message: error.message;
       dispatch({ type: pl.PRODUCT_LIST_FAIL, payload: message });  
     
    }
    
} 
const detailsProduct = (productId) => async (dispatch) => {
try {

    dispatch({ type: pl.PRODUCT_DETAILS_REQUEST });
    const { data } = await axios.get(`${PROD_URL}/products/${productId}`);    
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
            const {data} = await axios.post(`${PROD_URL}/products`, product, headers);
            dispatch({type: pl.PRODUCT_SAVE_SUCCESS, payload: data});
            
        } else {
            
            const { data } = await axios.put(`${PROD_URL}/products/${product._id}`, product,headers);
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
       const { data } = await axios.delete(`${PROD_URL}/products/${productId}`, headers);
       dispatch({type: pl.PRODUCT_DELETE_SUCCESS, payload: data, success: true});
        
   } catch (error) {
       dispatch({type: pl.PRODUCT_DELETE_FAIL, payload: error.message});
   }
}
const listProductCategories = () => async (dispatch) => {
    try {
 
        dispatch({ type: pl.PRODUCT_CATEGORY_REQUEST });
        const { data } = await axios.get(`${PROD_URL}/products/categories`);
        dispatch({ type: pl.PRODUCT_CATEGORY_SUCCESS, payload: data });
        
    } catch(error) {
       const message = error.response && error.response.data.message ? error.response.data.message: error.message;
       dispatch({ type: pl.PRODUCT_CATEGORY_REQUEST, payload: message });  
     
    }
    
} 

const createReview = (productId, review) => async (dispatch) => {
    dispatch({type: pl.PRODUCT_REVIEW_CREATE_REQUEST });
    try {
        const { data } = await axios.post(`${PROD_URL}/products/${productId}/reviews`, review, headers);
        dispatch({type:pl.PRODUCT_REVIEW_CREATE_SUCCESS, payload: data.review});

    } catch(error) {
        const message = error.response && error.response.data.message ? error.response.data.message: error.message;
        dispatch({type: pl.PRODUCT_REVIEW_CREATE_FAIL, payload: message});
    }
}

export { listProducts, detailsProduct, saveProduct, deleteProduct, listProductCategories, createReview }; 