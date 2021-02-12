import React, {  useState } from 'react';
import { savePayment } from "../actions/cartActions";
import { useSelector, useDispatch } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';


function PaymentScreen(props){

    const [paymentMethod, setPaymentMethod] = useState('paypal');
    
    const userRegister = useSelector(state => state.userRegister);
    const { loading, userInfo, error } = userRegister;
    
    const shippingInfo = useSelector(state=>state.cart);
    const { shippingAddress: shipping } = shippingInfo;

    const dispatch = useDispatch();

    if(!shipping.address || !shipping.city || !shipping.country) {
        props.history.push('shipping');
    }
    const submitHandler = (e) => {      
        e.preventDefault();
        dispatch(savePayment({paymentMethod}));
        props.history.push('/placeorder');
    }

    return (
        <div> 
            <CheckoutSteps step1 step2 step3 />
            <div className="form">
                <form onSubmit={submitHandler}>
                    <ul className="form-container">
                        <li>
                            <h2> Payment Method </h2>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="paymentMethod" id="paymentMethod" value='paypal'
                                       onChange={(e)=> setPaymentMethod(e.target.value)} />
                                <label htmlFor="paypal">  Paypal </label>                          

                            </div>
                            <div>
                                <input type="radio" name="paymentMethod" id="paymentMethod" value='stripe'
                                       onChange={(e)=> setPaymentMethod(e.target.value)} />
                                <label htmlFor="stripe"> Stripe </label>                          

                            </div>
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
export default PaymentScreen;