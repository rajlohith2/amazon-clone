import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector} from "react-redux";
import {LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import {updateUserProfile, userDetails} from "../actions/UserActions";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";

export default function ProfileSCreen() {
    
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmationPassword, setConfirmationPassword] = useState('');

    const signedInUser = useSelector(state => state.userSignin);
    const { userInfo } = signedInUser;
    const profile = useSelector(state=>state.userProfile);
    const {profileLoading, error, user} =  profile;

    const updatedProfile = useSelector(state => state.userProfileUpdate);
    const { loading:loadingUpdate, error:errorUpdate, success: successUpdate } = updatedProfile
    
    const dispatch = useDispatch();
   
    const submitHandler = (e)=>{
        e.preventDefault();
        
        if(password !== confirmationPassword) {
            alert("Password does not match");
        }else {

            dispatch(updateUserProfile({userId: user._id, name, email, password}));
        }
    }
     useEffect(() => {
        if(!user) {
            dispatch({ type:USER_UPDATE_PROFILE_RESET });
            dispatch(userDetails(userInfo._id));
        }else { //after loading data from backend
            setName(user.name);
            setEmail(user.email); 
        }
        
     }, [user]);
   
    return  (
            <li>
                { profileLoading ? <LoadingBox />:
                     error &&  <MessageBox variant="danger" msg={error} />
                    }
                    { loadingUpdate ? <LoadingBox /> :
                      errorUpdate ? <MessageBox variant="danger" msg={errorUpdate} /> :
                      successUpdate && <MessageBox variant="success" msg={'Profile updated successfully'} />      
                    }
                    { user && (
                      <form onSubmit={submitHandler} className="form">
                          <ul className="form-container">                         
                                <h1> User Profile</h1>                                       
                            
                                <li>
                                    <label htmlFor="Name">Name</label>
                                    <input type="text" 
                                            value={name} 
                                            placeholder="Enter Name"
                                            id="name"
                                            onChange={(e)=>setName(e.target.value)}
                                            />
                                </li>
                                <li>
                                    <label htmlFor="Email">Email</label>
                                    <input type="text" 
                                            value={email} 
                                            placeholder="Enter Email" 
                                            id="email" 
                                            onChange={(e)=>setEmail(e.target.value)}
                                    />
                                </li>
                                <li>
                                    <label htmlFor="Password">Password</label>
                                    <input type="password"
                                           placeholder="Enter Password"
                                           id="password" onChange={(e)=>setPassword(e.target.value)} />
                                </li>
                                <li>
                                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                                    <input type="password" 
                                            placeholder="Enter Password Confirmation" 
                                            id="confirmPassword" 
                                            onChange={(e)=>setConfirmationPassword(e.target.value)} />
                                </li>
                                <li>
                                    <label />
                                    <button type="submit" className="button primary"> Update</button>
                                </li>
                          </ul>
                            
                        </form>
                    )
                }
                    
                
            </li>
    )
   
}