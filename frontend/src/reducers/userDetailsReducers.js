
import * as uc from '../constants/userConstants';
export const profileReducer =(state = {}, action) =>{
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