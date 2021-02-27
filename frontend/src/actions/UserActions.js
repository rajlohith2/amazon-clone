//workflow of these login credentials
/*
    1. we fetch data from login screen, 
    2. we import constants from constants, 
    3. we make  reducers, 
    4. in reducer we import constants and export it to store;
    5. store keeps data which are accessible at every page in react
    6. On signinScreen (page), We use useSelector() to call variable from redux store.

*/  

import axios from "axios";
import * as uc from "../constants/userConstants";
import { headers } from "../config/userInfo"


const signin = (email, password) => async(dispatch) => {
 try {
   
   dispatch({type: uc.USER_SIGNIN_REQUEST, payload: { email, password } });
   const { data } = await axios.post("/api/users/signin", { email, password});
   dispatch({type: uc.USER_SIGNIN_SUCCESS, payload: data });  
   localStorage.setItem('userInfo', JSON.stringify(data));
    
 } catch (error) {
   const message = error.response && error.response.data.message ? error.response.data.message: error.message;
    dispatch({type: uc.USER_SIGNIN_FAIL, payload: message});
 }
}
const register = (userData) => async(dispatch) => {
  dispatch({type: uc.USER_REGISTER_REQUEST, payload: userData });
  try {
    const { data } = await axios.post("/api/users/register", userData);
    dispatch({type: uc.USER_REGISTER_SUCCESS, payload: data});
    

  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message: error.message;
    dispatch({type: uc.USER_REGISTER_FAIL, payload: message});
   
    
  }
}
   const userDetails = (userId) => async(dispatch)=> {
     dispatch({type: uc.USER_DETAILS_REQUEST, payload:userId});     
     try {
       
           const { data } = await axios.get(`/api/users/${userId}/details`, headers);           
           dispatch({type: uc.USER_DETAILS_SUCCESS, payload: data});
          
     } catch (error) {
       // TODO: I will change this message once project is complete to one function of response error 
       const message = error.response && error.response.data.message ?error.response.data.message :error.message;
       dispatch({type: uc.USER_DETAILS_FAIL, payload: message});
       console.log(message);
     }
     
  }
  const updateUserProfile = (updateUserData)=> async (dispatch)=> {
    dispatch({type: uc.USER_UPDATE_PROFILE_REQUEST,payload: updateUserData});
    try {
       const { data } = await axios.put(`/api/users/profile`, updateUserData, headers);
       dispatch({type: uc.USER_UPDATE_PROFILE_SUCCESS, payload: data});
       dispatch({type: uc.USER_SIGNIN_SUCCESS, payload:data});       
       localStorage.setItem("userInfo", JSON.stringify(data));

    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message : error.message;
      dispatch({type: uc.USER_UPDATE_PROFILE_FAIL, payload: message});
    }
  }
  const listUsers = () => async (dispatch)=> {
    dispatch({type: uc.USER_LIST_REQUEST});
    try {
      const { data } = await axios.get('/api/users', headers);
      dispatch({type: uc.USER_LIST_SUCCESS, payload: data});
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message: error.message;
      dispatch({type: uc.USER_LIST_FAIL, payload: message});
    }
  }

  const eraseUser = (userId) => async (dispatch) => {
    dispatch({ type: uc.USER_DELETE_REQUEST, payload: userId });
    try {
      const { data } = await axios.delete(`/api/users/${userId}/delete`, headers);
      dispatch({ type: uc.USER_DELETE_SUCCESS, payload: data });
     
      
    } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message: error.message;
      dispatch({ type: uc.USER_DELETE_FAIL, payload: message });
    }
  }

const signout =() =>(dispatch) => {
  localStorage.removeItem("userInfo"); 
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({type: uc.USER_SIGNOUT});
  window.location.assign("/");
}
const updateUserInfo = (userEditedInfo) => async (dispatch)=> {
  dispatch({ type: uc.USER_EDIT_REQUEST, payload: userEditedInfo});
  try {
      const {data} = await axios.put(`/api/users/${userEditedInfo._id}/edit`, userEditedInfo, headers);
      dispatch({ type: uc.USER_EDIT_SUCCESS, payload: data});
  } catch (error) {
      const message = error.response && error.response.data.message ? error.response.data.message: error.message;
      dispatch({type: uc.USER_EDIT_FAIL, payload: message});
    
  }
}

export { signin, register, signout,userDetails, updateUserProfile, listUsers, eraseUser, updateUserInfo };