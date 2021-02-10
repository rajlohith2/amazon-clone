import React, { useEffect } from "react";
import { detailsOrder } from '../actions/orderActions';
import {  useDispatch, useSelector} from "react-redux";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { Link } from "react-router-dom";

function OrderScreen(props) {
    const orderId = props.match.params.id;
    const orderDetails = useSelector(state => state.orderDetails);
    const { error, order, loading } = orderDetails;

    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);

   return loading ? (<LoadingBox /> ):
         error ? (<MessageBox variant="message"> {error} </MessageBox>):(
    <>
        <h1>Order: {order._id}</h1>
        <div className="placeorder">
            <div className="placeorder-info">
                <div> 
                    <h3> shippingAddress </h3>
                    <div>
                        <strong>  Name:</strong> {order.shippingAddress.fullName} <br />                   
                        <strong> Address:</strong>                       
                        { order.shippingAddress.address } , { order.shippingAddress.city }
                        { order.shippingAddress.postalCode } , { order.shippingAddress.country }
                    </div>
                </div> 
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {order.paymentMethod }
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li> 
                            <h3> Shopping Cart</h3>
                            <div> Price</div>

                        </li>
                        {
                            
                            order.orderItems.length === 0 ?
                            <div>
                                Cart is empty
                            </div>
                            :
                            order.orderItems.map(item =>
                            <li>
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
            </ul>
                <h3>
                      Subtotal ( { order.orderItems.reduce((accumulator, currentItems) => accumulator + currentItems.qty, 0) } items)
                      :
                      $ ({ order.orderItems.reduce((accumulator, currentItems) => accumulator + currentItems.price* currentItems.qty, 0)} )
                </h3>  
            </div>

        </div>
    </>    
    ) 
   
}

export default OrderScreen;