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
 function updateProfileReducer(state = {}, action) {
     switch (action.type) {
         case uc.USER_UPDATE_PROFILE_REQUEST:
             return { loading: true };
         case uc.USER_UPDATE_PROFILE_SUCCESS:
            return { loading: false, success: true};  
         case uc.USER_UPDATE_PROFILE_FAIL:
             return { loading:false, error: action.payload };
          case uc.USER_UPDATE_PROFILE_RESET:
              return {};   
         default:
             return state;
     }
 }
 export  {userSigninReducer, UserRegisterReducer, updateProfileReducer }
 