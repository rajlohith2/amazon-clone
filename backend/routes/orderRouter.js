import expressAsyncHandler  from "express-async-handler";
import Order from "../models/Order";
import express from "express";
import { isAuth,isAdmin, isSellerOrAdmin } from "../middleware/auth";
import SendEmail from "../util/SendEmail";

const orderRouter = express.Router();
orderRouter.post('/', isAuth, expressAsyncHandler( async (req, res)=> {    
    if(req.body.orderItems.length === 0) {
       return res.status(400).send({message: 'cart is empty'});
    }else {
       
        const order = new Order({
            seller: req.body.orderItems[0].seller,
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
orderRouter.get('/',isAuth, isSellerOrAdmin, expressAsyncHandler( async(req, res)=>{
    try {
        const seller = req.query.seller || '';
        const sellerFilter = seller ? { seller }: {};
        const orders = await Order.find({...sellerFilter}).populate('user', 'name');
        return orders ? res.status(200).send(orders): res.status(404).send({message:'No Order found so far'});
    } catch (error) {
        return res.status(500).send({message: error.message});
    }
  
}));
orderRouter.delete('/:id',isAuth, isAdmin, expressAsyncHandler( async(req, res) => {
    console.log(`Order delete attempt`);
    const orderToDelete = await Order.findByIdAndDelete(req.params.id);
    return orderToDelete ? res.status(200).send({order:orderToDelete, message:'Order is deleted'}): res.status(404).send({message: 'Order not found'});
}));
orderRouter.get('/client/orders', isAuth, expressAsyncHandler( async(req, res)=> {
        const orders = await Order.find({user: req.user._id});
        return orders ? res.status(200).send(orders) : res.status(404).send({message: 'Order not Found'});
}));
orderRouter.put('/:id/pay', isAuth, expressAsyncHandler( async(req, res)=> {
    const order = await Order.findById(req.params.id);
    
    if(order) {
        const {id, status, update_time, email_address} = req.body;
        order.isPaid = true;
        order.paidAt = Date.now();
        order.status = status;
        order.paymentResult = {
            id,
            status,
            update_time,
            email_address
        };
        const updatedOrder = await order.save();
         SendEmail.sendMessage(req.user.email,updatedOrder);
        return res.send({message: 'order is paid', order:updatedOrder});
    } else {
        return res.status(400).send({message: 'Order not Found'});
    }
}));
orderRouter.put('/:id/deliver', expressAsyncHandler( async(req, res)=>{
 const deliverOrder = await Order.updateOne({_id:req.params.id}, {isDelivered:true, deliveredAt: Date.now()});
 return deliverOrder ? res.status(200).send({order:deliverOrder}): res.status(404).send({message: 'Order is delivered'});
}));
export default orderRouter;