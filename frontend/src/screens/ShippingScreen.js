import React, { useEffect, useState } from 'react';
import {  saveShipping } from "../actions/cartActions";
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen(props){

    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');

    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address, postalCode, country, city}));
        props.history.push('payment');
    }
    
    return (
        <div> 
            <CheckoutSteps step1 step2 />
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2> Shipping </h2>
                        </li>
                        
                        <li>
                            <label htmlFor="address">  Address </label>                          
                            <input type="text" name="address" id="address" onChange={(e)=> setAddress(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="postalCode"> Postal Code</label>
                            <input type="text" name="postalCode" id="postalCode" onChange={(e)=> setPostalCode(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="city"> City</label>
                            <input type="text" name="city" id="city" onChange={(e)=> setCity(e.target.value)}/>
                        </li>
                        <li>
                            <label htmlFor="country">  Country </label>                          
                            <input type="country" name="country" id="country" onChange={(e)=> setCountry(e.target.value)} />
                        </li>
                        <li>
                            <button className="button primary" type="submit"> Continue</button>
                        </li>                    
                    </ul>
                </form>
            </div>
            
        </div>
    );
   
}
export default ShippingScreen;