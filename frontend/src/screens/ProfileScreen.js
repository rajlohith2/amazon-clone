import React, { useEffect, useState } from "react";
import {  useDispatch, useSelector} from "react-redux";
import {LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import {userDetails} from "../actions/UserActions";

export default function ProfileSCreen() {
    const signedInUser = useSelector(state => state.userSignin);
    const { userInfo } = signedInUser;
    const profile = useSelector(state=>state.userProfile);
    const {profileLoading, error, user} =  profile;
    const dispatch = useDispatch();
   
    const submitHandler = (e)=>{
        e.preventDefault();
        // TODO: I will dispatch user info update
    }
     useEffect(() => {
        
        dispatch(userDetails(userInfo._id));
     }, []);
   
    return  (
            <li>
                { profileLoading ? <LoadingBox />:
                     error &&  <MessageBox variant="danger" msg={error} />
                    }
                    { user && (
                      <form onSubmit={submitHandler} className="form">
                          <ul className="form-container">                         
                                <h1> User Profile</h1>                                       
                            
                                <li>
                                    <label htmlFor="Name">Name</label>
                                    <input type="text" value={user.name} placeholder="Enter Name" id="name" />
                                </li>
                                <li>
                                    <label htmlFor="Email">Email</label>
                                    <input type="text" value={user.email} placeholder="Enter Email" id="email" />
                                </li>
                                <li>
                                    <label htmlFor="Password">Password</label>
                                    <input type="passwprd" placeholder="Enter Password" id="password" />
                                </li>
                                <li>
                                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                                    <input type="password" placeholder="Enter Password Confirmation" id="password" />
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