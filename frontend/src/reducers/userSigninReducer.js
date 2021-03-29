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
 function userListReducer(state = { }, action) {
    switch (action.type) {
        case uc.USER_LIST_REQUEST:
            return { loading: true };
        case uc.USER_LIST_SUCCESS:
           return { loading: false, users: action.payload};  
        case uc.USER_LIST_FAIL:
            return { loading:false, error: action.payload };
    
        default:
            return state;
    }
}
    function deleteUserReducer(state = { }, action) {
        switch (action.type) {
        case uc.USER_DELETE_REQUEST: 
                return { loading: true };

            case uc.USER_DELETE_SUCCESS:
               return { loading: false, success: true};  
            
            case uc.USER_DELETE_FAIL:
                return { loading:false, error: action.payload };
            
            case uc.USER_DELETE_RESET:
                return { };
        
            default:
                return state;
        }
    }
    function userUpdateReducer(state = { }, action) {
        switch (action.type) {
            case uc.USER_EDIT_REQUEST: 
                    return { loading: true };
        
                case uc.USER_EDIT_SUCCESS:
                   return { loading: false, success: true};  
                
                case uc.USER_EDIT_FAIL:
                    return { loading:false, error: action.payload };
                
                case uc.USER_EDIT_RESET:
                    return { };
            
                default:
                    return state;
        }
    }
    function userDetailsReducer(state = {}, action){
        switch (action.type) {
            case uc.USER_DETAILS_REQUEST:
                return {profileLoading: true };
            case uc.USER_DETAILS_SUCCESS:           
                return { profileLoading: false, user: action.payload };
            case uc.USER_DETAILS_FAIL:
                return { profileLoading: false, error: action.payload};
            default: 
                return state; 
        }
    }
    function topSellersReducer(state = { }, action) {
        switch (action.type) {
            case uc.USER_TOP_SELLERS_LIST_REQUEST:
                return { loading: true };
            case uc.USER_TOP_SELLERS_LIST_SUCCESS:
               return { loading: false, users: action.payload};  
            case uc.USER_TOP_SELLERS_LIST_FAIL:
                return { loading:false, error: action.payload };
        
            default:
                return state;
        }
    }

    function userAddressMapReducer(state = {}, action) {
        switch (action.type) {
            case uc.USER_ADDRESS_MAP_CONFIRM:
                return {address: action.payload};
            default:
                return state;

        }
    }
 export  {
     userSigninReducer, 
    UserRegisterReducer, 
    updateProfileReducer,
     userListReducer, 
     deleteUserReducer, 
     userUpdateReducer, 
     userDetailsReducer, 
     topSellersReducer,
     userAddressMapReducer

    }
 