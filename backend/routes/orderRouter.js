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
export default orderRouter;