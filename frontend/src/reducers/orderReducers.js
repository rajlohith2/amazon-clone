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