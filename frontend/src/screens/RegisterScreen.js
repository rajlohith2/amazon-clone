import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
  
import {  register } from "../actions/UserActions";
import { useSelector, useDispatch } from 'react-redux';


function RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();
    useEffect(()=> {
        if(userInfo) {
            props.history.push("/");
        }
        return () => {

        }
    },[userInfo]) //if user state info change then useEffect() will executes it's code
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(register(name, email,password));

    }

    return ( 
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Create Account</h2>
                    </li>
                    <li>{ loading && <div>Please wait ...</div>}             
                        { error && <div>{ error } </div> }
                    
                    
                    </li>
                    <li>
                        <label htmlFor="name">  Name </label>                          
                        <input type="text" name="name" id="name" onChange={(e)=> setName(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="email">  Email </label>                          
                        <input type="email" name="email" id="email" onChange={(e)=> setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e)=> setPassword(e.target.value)}/>
                    </li>
                    <li>
                        <label htmlFor="rePassword">confirm Password</label>
                        <input type="password" name="rePassword" id="rePassword" onChange={(e)=> setRePassword(e.target.value)}/>
                    </li>
                    <li>
                        <button className="button primary" type="submit"> Register</button>
                    </li>
                    <li> Already has an account ? <Link to="/signin">Sign-in</Link></li>
                    <li>
                        
                    </li>
                </ul>
            </form>
        </div>
    
    );
   
}
export default RegisterScreen;