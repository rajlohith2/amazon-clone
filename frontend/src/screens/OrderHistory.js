import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listMyOrders } from "../actions/orderActions";
import { LoadingBox}  from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";

export default function OrderHistory(props){
    const myOrders = useSelector(state => state.myOrders);
    const {error, loading, orders} = myOrders;
    const dispatch = useDispatch();
    
    useEffect( () => {
        dispatch(listMyOrders());
    } , [dispatch])
    console.log(orders);
    return (
        <div>
            <h1>Order History</h1>  
            {
                loading ? (<LoadingBox /> ):
                 error ? (<MessageBox variant="danger" msg={error} />):(
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <td>ID</td>
                                <td>DATE</td>
                                <td>TOTAL</td>
                                <td>PAID</td>
                                <td>DELIVERED</td>
                            </tr>
                        </thead>
                        <tbody>
                            { orders &&
                                orders.map((order) => (
                                    <tr>
                                        <td>{order._id}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice}</td>
                                        
                                        <td>{order.isPaid && order.paidAt ? order.paidAt.substring(0, 10):'No' }</td>
                                        <td>{order.isDelivered ? order.deliveredAt.substring(0, 10):'No' }</td>
                                        <td>
                                            <button type="submit" className="small"
                                                    onClick={() => props.history.push(`/order/${order._id}`)}
                                            > Details</button>
                                        </td>
                                    </tr>
                                ))
                            }
                            
                        </tbody>

                    </table>
                </>
            
             
            )}
            
        </div>
    )
}
