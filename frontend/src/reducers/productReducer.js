import * as pl from "../constants/productConstants";

function productListReducer( state = { products: [] }, action) {
 switch(action.type) {
     case pl.PRODUCT_LIST_REQUEST:
         return { loading: true , products: [] };
     case pl.PRODUCT_LIST_SUCCESS:
         const { products, page, pages } = action.payload;
         //console.log(JSON.stringify(pages))
         return { loading: false, products, pages, page}; 
        // return { loading: false, products, pages, page}; 
     case pl.PRODUCT_LIST_FAIL:
         return { loading: false, error: action.payload }; 
     default:
         return state; 
 }   
}
function productCategoryListReducer( state = { categories: [] }, action) {
    switch(action.type) {
        case pl.PRODUCT_CATEGORY_REQUEST:
            return { loading: true , categories: [] };
        case pl.PRODUCT_CATEGORY_SUCCESS:
            return { loading: false, categories: action.payload}; 
        case pl.PRODUCT_CATEGORY_FAIL:
            return { loading: false, error: action.payload }; 
        default:
            return state; 
    }   
   }

function productDetailsReducer(state = { product: {} }, action) {
    switch(action.type) {
        case pl.PRODUCT_DETAILS_REQUEST:
            return { loading: true }; 
         case pl.PRODUCT_DETAILS_SUCCESS: 
              return { loading: false, product: action.payload };
         case pl.PRODUCT_DETAILS_FAIL:
             return { loading: false, error: action.payload };
         default:
             return state;        
    }
}
function productSaveReducer(state = { product: {} }, action) {
    switch(action.type) {
        case pl.PRODUCT_SAVE_REQUEST:
            return { loading: true };
        case pl.PRODUCT_SAVE_SUCCESS: 
            return { loading: false, success: true, product: action.payload };
        case pl.PRODUCT_SAVE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;        
    }
}
function productDeleteReducer( state = {product:{}}, action) {
    switch(action.type) {
        case pl.PRODUCT_DELETE_REQUEST:
            return {loading: true};
        case pl.PRODUCT_DELETE_SUCCESS:
            return {loading: false, product: action.payload, success: true};
            case pl.PRODUCT_DELETE_RESET:
                return { };

        case pl.PRODUCT_DELETE_FAIL:
            return {loading: false, error: action.payload};
        default:
            return state;        
    }
}
function productReviewCreateReducer( state = {}, action) {
    switch(action.type) {
        case pl.PRODUCT_REVIEW_CREATE_REQUEST:
            return { loading: true };
        case pl.PRODUCT_REVIEW_CREATE_SUCCESS: 
            return { loading: false, success: true, review: action.payload };
        case pl.PRODUCT_REVIEW_CREATE_FAIL:
            return { loading: false, error: action.payload };
        case pl.PRODUCT_REVIEW_CREATE_RESET:
         return {};
        default:
            return state;        
    }
}

export { productListReducer, productDetailsReducer, productSaveReducer, productDeleteReducer, productCategoryListReducer, productReviewCreateReducer };