import React, { useEffect, useState } from 'react';
import {  saveShipping } from "../actions/cartActions";
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen(props){

   const { shippingAddress } =  useSelector(state=>state.cart);
   const [shipping, setShippingInfo] = useState(null);
   
   const [fullName, setFullName] = useState('')
   const [address, setAddress] = useState('');
   const [country, setCountry] = useState('');
   const [postalCode, setPostalCode] = useState('');
   const [city, setCity] = useState('');
   const { userInfo } = useSelector(state => state.userSignin);

    useEffect(() =>   {
        setShippingInfo(shippingAddress);    
            
        if(shipping)  {
        setFullName(shipping.fullName);
        setAddress(shipping.address);
        setCity(shipping.city);
        setCountry(shipping.country);
        setPostalCode(shipping.postalCode);    
        }
    },[shipping]);
  
    if(!userInfo) {
        props.history.push("/signin");
    }
        
    
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShipping({address, postalCode, country, city,fullName}));
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
                            <label htmlFor="fullName">  Full Name </label>                          
                            <input type="text" name="fullName" id="fullName" onChange={(e)=> setFullName(e.target.value)} value={fullName} />
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