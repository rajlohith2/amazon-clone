import * as oc from "../constants/OrderConstants";
export const orderCreateReducer =(state={}, action) =>{
    switch(action.type){
        case oc.ORDER_CREATE_REQUEST:
            return {loading: true}
        case oc.ORDER_CREATE_SUCCESS:
            return {loading: false, success: true, order:action.payload};
        case oc.ORDER_CREATE_FAIL:
            return {loading: false, error: action.payload};
        case oc.ORDER_CREATE_RESET:
            return {};
        default: 
            return state;
             
    }
}
export const orderDetailsReducer = (state = {loading:true, order:{} }, action)=> {
    switch(action.type) {
        case oc.ORDER_DETAILS_REQUEST:
            return  {loading: true};
        case oc.ORDER_DETAILS_SUCCESS:
            return {loading: false, order: action.payload };
        case oc.ORDER_DETAILS_FAIL:   
            return {loading: false, error: action.palyload}
        default:
            return state; 
    }
}