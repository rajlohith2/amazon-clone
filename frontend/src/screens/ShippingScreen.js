import React, { useEffect, useState } from 'react';
import {  saveShipping } from "../actions/cartActions";
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { shipping } from '../config/shipping';


function ShippingScreen(props){

   const cartInfo =  useSelector((state)=>state.cart);

   const [address, setAddress] = useState(shipping ? shipping.address:'');
   const [country, setCountry] = useState(shipping ? shipping.country:'');
   const [postalCode, setPostalCode] = useState(shipping ? shipping.postalCode:'');
   const [city, setCity] = useState(shipping ? shipping.city:'');

    const { userInfo } = useSelector(state => state.userSignin);
    // after having entire feature working I will make function to check signed in user
    
        if(!userInfo) {
            props.history.push("/signin");
        }
    
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
                            <input type="text" name="address" id="address" onChange={(e)=> setAddress(e.target.value)} value={address}/>
                        </li>
                        <li>
                            <label htmlFor="postalCode"> Postal Code</label>
                            <input type="text" name="postalCode" id="postalCode" onChange={(e)=> setPostalCode(e.target.value)} value={postalCode}/>
                        </li>
                        <li>
                            <label htmlFor="city"> City</label>
                            <input type="text" name="city" id="city" onChange={(e)=> setCity(e.target.value)} value={city}/>
                        </li>
                        <li>
                            <label htmlFor="country">  Country </label>                          
                            <input type="country" name="country" id="country" onChange={(e)=> setCountry(e.target.value)} value={country}/>
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