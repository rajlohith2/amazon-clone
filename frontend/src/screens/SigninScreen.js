import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
  
import { signin } from "../actions/UserActions";
import { useSelector, useDispatch } from 'react-redux';


function SigninScreen(props){

    const [ email, setEmail]  = useState('');
    const [ password, setPassword] = useState('');

    const userSignin = useSelector(state => state.userSignin);
    const { loading, userInfo, error } = userSignin;

    const dispatch = useDispatch();
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));

    };

    useEffect(()=> {
        if(userInfo) {
            props.history.push("/");
        }
        return () => {

        }
    },[userInfo]) //if user state info change then useEffect() will executes it's code
    

    return ( 
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Sign-In</h2>
                    </li>
                    <li>
                    { loading && <div>Loading...</div> }
                    { error && <div> { error } </div> }
                    
                    </li>
                    <li>
                        <label htmlFor="email">  Email </label>                          
                        <input type="email" name="email" id="email" onChange={(e)=> setEmail(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" onChange={(e)=>setPassword(e.target.value)} />
                    </li>
                    <li>
                        <button className="button primary" type="submit"> Sign in</button>
                    </li>
                    <li> New to Amazona? </li>
                    <li>
                        <Link to="/register" className="button text-center secondary">
                            Create your Amazona Account 
                        </Link>
                    </li>
                </ul>
            </form>
        </div>
    
    );
   
}
export default SigninScreen;