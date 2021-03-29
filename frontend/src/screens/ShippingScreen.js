import React, { useEffect, useState } from 'react';
import {  saveShipping } from "../actions/cartActions";
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';


function ShippingScreen(props){

    const cart = useSelector(state => state.cart);
    const {  shippingAddress } = cart;

    const mapAddress = useSelector(state =>state.mapAddress);
    const{ address: addressMap } = mapAddress;

    const [lat, setLat] = useState(shippingAddress.lat);
    const [lng, setLng] = useState(shippingAddress.lng);

   const [fullName, setFullName] = useState(shippingAddress.fullName);
   const [address, setAddress] = useState(shippingAddress.address);
   const [country, setCountry] = useState(shippingAddress.country);
   const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
   const [city, setCity] = useState(shippingAddress.country);
   const { userInfo } = useSelector(state => state.userSignin);
  
    useEffect(() =>   { },[]);
    if(!userInfo) {
        props.history.push("/signin");
        
    }
    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        const newLat = addressMap ? addressMap.lat: lat;
        const newLng = addressMap ? addressMap.lng : lng;
        if(addressMap) {
            setLat(addressMap.lat);
            setLng(addressMap.lng);
        }
        let moveOn = true;
        if(!newLat || !newLng) {
            moveOn = window.confirm("You Didn\'t Set Your Location on Map. Continue ?");
        }
        if(moveOn) {
            dispatch(saveShipping({address, postalCode, country, city,fullName,lat: newLat, lng: newLng }));
            props.history.push('payment');
        }
    }
    const chooseOnMap = ()=>{
        dispatch(saveShipping({ fullName, address,city, postalCode,country,lat, lng }))
        props.history.push("/map");
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
                            <button className="button primary" onClick={chooseOnMap}> Choose On Map</button>
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