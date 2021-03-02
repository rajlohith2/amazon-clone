import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT, CART_SAVE_SHIPPING, CART_ADD_ITEM_FAIL } from '../constants/cartConstants';

function cartReducer(state= { cartItems: [], shippingAddress: { }, payment:{} }, action) {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x => x.product === item.product);
            
            if(product) {
               return {
                   ...state,
                   error:'',
                   cartItems:
                    state.cartItems.map(x => x.product === product.product ? item: x)
                };
            }
            return {...state, error:'', cartItems: [...state.cartItems, item]};
        case CART_REMOVE_ITEM:
            return {...state, error: ' ', cartItems: state.cartItems.filter( item =>  item.product !== action.payload)};  
        case CART_SAVE_SHIPPING:           
            return {...state, shippingAddress: action.payload }; 
            
        case CART_SAVE_PAYMENT:                    
            return {...state, payment: action.payload };
        case CART_EMPTY:
            return {...state, error:' ', cartItems: []};
        case CART_ADD_ITEM_FAIL:
            return {...state, error: action.payload};
        default:
            return state;    
    }
}
export { cartReducer }; 