 import * as uc from '../constants/userConstants';

 function userSigninReducer(state = {}, action) {
     switch(action.type) {
         case uc.USER_SIGNIN_REQUEST:
             return {loading: true};
          case uc.USER_SIGNIN_SUCCESS:
              return { loading: false, userInfo: action.payload};
          case uc.USER_SIGNIN_FAIL:
              return {loading: false, error: action.payload};
          default:
              return state;      
     }
 }
 function UserRegisterReducer(state = {}, action) {
     switch(action.type) {
        case uc.USER_REGISTER_REQUEST: 
            return {loading: true};
        case uc.USER_REGISTER_SUCCESS:
             return {loading: false, userInfo: action.payload};
        case uc.USER_REGISTER_FAIL:
             return {loading: false, error: action.payload};
        default: 
              return state;  

     }
 }
 export  {
     userSigninReducer, UserRegisterReducer
 }
 