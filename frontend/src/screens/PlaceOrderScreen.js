import React, { useEffect } from "react";
import { createOrder } from '../actions/orderActions';
import {Link} from 'react-router-dom';
import {  useDispatch, useSelector} from "react-redux";
import CheckoutSteps from '../components/CheckoutSteps';
import { ORDER_CREATE_RESET } from "../constants/OrderConstants";
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import { headers, user } from "../config/userInfo";

function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    const { cartItems, shipping, payment } = cart;

    const orderInfo = useSelector(state=> state.orderCreate);
    const {success, error, loading, order} = orderInfo;
    
    const dispatch = useDispatch();
    if(!payment) {
        props.history.push("payment");
    }
    useEffect(() => {
        if(success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
            console.log(`hiii: ${props.history}`)
        }
    },[dispatch, order, props.history, success]);
    //},[dispatch, order, props.history, success]);
    
    const itemsPrice = cartItems.reduce((a, c)=> a + c.price * c.qty, 0);
    const shippingPrice = itemsPrice < 100 ? 0: 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;
    
   
    const placeOrderHandler = () => {  
        const shippingAddress = {...shipping, fullName: user};  
        dispatch(createOrder({orderItems: cartItems, shippingAddress, payment, itemsPrice, shippingPrice, taxPrice, totalPrice})); 
    }
    return (
    <>
        <CheckoutSteps step1 step2 step3 step4/>
        <div className="placeorder">
            <div className="placeorder-info">
                <div> 
                    <h3> Shipping </h3>
                    <div>
                        <strong>  Name:</strong> {user} <br />                   
                        <strong> Address:</strong>                       
                        { cart.shipping.address } , { cart.shipping.city }
                        { cart.shipping.postalCode } , { cart.shipping.country }
                    </div>
                </div> 
                <div>
                    <h3>Payment</h3>
                    <div>
                        Payment Method: {payment }
                    </div>
                </div>
                <div>
                    <ul className="cart-list-container">
                        <li> 
                            <h3> Shopping Cart</h3>
                            <div> Price</div>

                        </li>
                        {
                            
                            cartItems.length === 0 ?
                            <div>
                                Cart is empty
                            </div>
                            :
                            cartItems.map(item =>
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
                    <button className="button primary full-width" onClick={placeOrderHandler} disabled={cart.cartItems.length === 0}>Place Order</button>
                </li>
                  {loading && <LoadingBox />}
                  {error && <MessageBox variant="danger">{error}</MessageBox>}
                <li>
                    <h3> Order Summary</h3>
                </li>
                <li>
                    <div>Items</div>
                    <div>${itemsPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Shipping</div>
                    <div>${shippingPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Tax</div>
                    <div>${taxPrice.toFixed(2)}</div>
                </li>
                <li>
                    <div>Order Total</div>
                    <div>${totalPrice.toFixed(2)}</div>
                </li>
            </ul>
                <h3>
                      Subtotal ( { cartItems.reduce((accumulator, currentItems) => accumulator + currentItems.qty, 0) } items)
                      :
                      $ ({ cartItems.reduce((accumulator, currentItems) => accumulator + currentItems.price* currentItems.qty, 0)} )
                </h3>  
            </div>

        </div>
    </>    
    )
}

export default PlaceOrderScreen;