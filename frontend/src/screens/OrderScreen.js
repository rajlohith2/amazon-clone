import React, { useEffect, useState } from "react";
import { PayPalButton } from'react-paypal-button-v2';
import { detailsOrder, payOrder } from '../actions/orderActions';
import {  useDispatch, useSelector} from "react-redux";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { Link } from "react-router-dom";
import axios from "axios";
import { ORDER_PAY_RESET } from "../constants/OrderConstants";

function OrderScreen(props) {
    const orderId = props.match.params.id;
    const[sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector(state => state.orderDetails);
    const { error, order, loading } = orderDetails;
    
    const dispatch = useDispatch();
    const orderPay = useSelector( state => state.orderPay);
    const { success:successPay, error:errorPay, loading:loadingPay } = orderPay;
    
    useEffect(() => {
         
        const addPayPalScript = async ()=> {
            const { data } = await axios.get(`/api/config/paypal`);
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://wwww.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => setSdkReady(true);            
            document.body.appendChild(script);
        };        
        if(!order || successPay || (order && order._id !== orderId)) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(orderId));            
            
        }else {
            if(!order.isPaid) {
                if(!window.paypal){
                    addPayPalScript();
                } else {
                    setSdkReady(true);                    
                }
            }
        }
       
    }, [dispatch, order, orderId, sdkReady]);
    
    const successPaymentHandler = (paymentResult) =>{
        //TODO: set payment handler
        dispatch(payOrder(order, paymentResult))
    }
   return loading ? (<LoadingBox /> ):
         error ? (<MessageBox variant="message" variant="danger" msg={error} /> ):
         (
    <>
        <h1>Order: {order._id}</h1>
        <div className="placeorder">
            <div className="placeorder-info">
                <div> 
                    <h3> Shipping </h3>
                    <div>
                        <strong>  Name:</strong> {order.shippingAddress.fullName} <br />                   
                        <strong> Address:</strong>                       
                        { order.shippingAddress.address } , { order.shippingAddress.city }
                        { order.shippingAddress.postalCode } , { order.shippingAddress.country }
                    </div>
                     {order.isDelivered ? <MessageBox variant="success" msg={`Delivered at ${order.deliveredAt}`} />:
                       <MessageBox variant="danger" msg={'order is not delivered'} />
                     } 
                </div> 
                <div>
                    
                    <div>
                    <strong> Payment Method:</strong>  {order.paymentMethod }                       
                    </div>
                    {order.isPaid ? <MessageBox msg={`Paid at ${order.paidAt}`} variant="success"/>  :
                       <MessageBox msg={'Not paid'} variant="danger"/>
                     } 
                     
                </div>
                <div>
                     <h3> Order Items</h3>  
                    <ul className="cart-list-container">                        
                        {                                    
                            order.orderItems.map(item =>
                            <li key={item._id}>
                                <div className="cart-image">
                                    <img src={item.image} alt="product" />
                                </div>    
                                <div className="cart-name"> 
                                    <Link to={`/product/`+ item.product}>   </Link> 
                                    {item.name} 
                                </div>    
                                <div className="cart-price">
                                { item.qty } x ${ item.price } = ${ item.qty * item.price }
                                </div>
                                <div></div>
                            </li>
                            )
                        }
                    </ul>
                </div>
                
                
            </div>
            <div className="placeorder-action"> 
            <ul>
                <li>
                    <h3> Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${order.itemsPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>shippingAddress</div>
                    <div>${order.shippingPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${order.taxPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${order.totalPrice.toFixed(2)}</div>
                </li>
                {!order.isPaid && ( 
                    
                    !sdkReady===false ?  <LoadingBox /> : 
                    <>
                        {errorPay && (
                            <MessageBox variant="danger" msg={error} />
                        )}
                        {loadingPay && (
                            <LoadingBox />
                        )}
                        <PayPalButton  amount={order.totalPrice} onSuccess={successPaymentHandler} /> 
                     </>
              
              )}
            </ul>
               
            </div>

        </div>
    </>    
    ) 
   
}

export default OrderScreen;