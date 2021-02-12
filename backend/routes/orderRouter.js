import expressAsyncHandler  from "express-async-handler";
import Order from "../models/Order";
import express from "express";
import { isAuth } from "../middleware/auth";

const orderRouter = express.Router();
orderRouter.post('/', isAuth, expressAsyncHandler( async (req, res)=> {    
    if(req.body.orderItems.length === 0) {
       return res.status(400).send({message: 'cart is empty'});
    }else {
       
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.payment,
            shippingPrice:req.body.shippingPrice,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user:req.user._id
        });
        const createdOrder = await order.save();
        return res.status(201).send({message:'New Order Created', order:createdOrder});
    }
})
);
orderRouter.get('/:id',isAuth, expressAsyncHandler( async(req, res) => {
 const order = await Order.findById(req.params.id);
 return order ? res.send(order): res.status(404).send({message:'Order not Found'});
}));
orderRouter.get('/client/orders', isAuth, expressAsyncHandler( async(req, res)=> {
  
   try { 
        const orders = await Order.find({user: req.user._id});
        return orders ? res.status(200).send(orders) : res.status(404).send({message: 'Order not Found'});
    
    } catch (error) {
        return res.status(500).send({error: error.message,message:'internal server error', user: req.user._id});
    } 
}))
export default orderRouter;