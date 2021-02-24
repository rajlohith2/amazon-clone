import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {deleteOrder, listAllOrders} from '../actions/orderActions';
import { LoadingBox } from "../components/LoadingBox";
import { MessageBox } from "../components/MessageBox";
import {  ORDER_DELETE_RESET } from "../constants/OrderConstants";

export default function OrdersListScreen (props)  {
    const ordersList = useSelector(state => state.orderslist);
    const {loading, orders, error} = ordersList;  
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading:loadingDelete, success:successDelete, error:errorDelete } = orderDelete;
    
    const deleteHandler = (order) => {
        if(window.confirm('Are you sure you want to delete?')){
             dispatch(deleteOrder(order._id));
             dispatch({type:ORDER_DELETE_RESET});
        }
    };
    const dispatch = useDispatch();
    useEffect(() => {        
        dispatch(listAllOrders());        
        if(successDelete){
           
        }

    },[dispatch, successDelete]);

    
return (  
    <div>
        <div>
            <h1> Orders</h1>
            {loading ? <LoadingBox /> : error && <MessageBox variant="danger" msg={error} />}
        </div>
        <table className="table">
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Name</td>
                    <td>DATE</td>
                    <td>TOTAL</td>
                    <td>PAID</td>
                    <td>DELIVERED</td>
                    <td>ACTION</td>
                </tr>
            </thead>
            <tbody>
                { orders &&
                    orders.map((order) => (
                        <tr key={order._id}>
                            <td>{order._id}</td>
                            <td>{order.user.name} </td>
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            
                            <td>{order.isPaid && order.paidAt ? order.paidAt.substring(0, 10):'No' }</td>
                            <td>{order.isDelivered ? order.deliveredAt.substring(0, 10):'No' }</td>
                            <td>
                                <button type="submit" className="small"
                                        onClick={() => props.history.push(`/order/${order._id}`)}
                                > Details</button>
                                <button className="small" type="submit" onClick={()=>deleteHandler(order)}> Delete </button>
                            </td>
                        </tr>
                    ))
                }
                
            </tbody>

        </table>
    </div>    
)
}