import * as pl from "../constants/productConstants";

function productListReducer( state = { products: [] }, action) {
 switch(action.type) {
     case pl.PRODUCT_LIST_REQUEST:
         return { loading: true };
     case pl.PRODUCT_LIST_SUCCESS:
         return { loading: false, products: action.payload}; 
     case pl.PRODUCT_LIST_FAIL:
         return { loading: false, error: action.payload }; 
     default:
         return state;

 }   
}
export { productListReducer } ;  