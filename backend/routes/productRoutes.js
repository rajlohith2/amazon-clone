import express, { Router } from "express";
import Product from '../models/Product';
import getToken  from '../middleware/auth';

const productRoute =  express.Router();

 productRoute.get('/', async(req, res)=> {
    const products = await Product.find({});
    return res.send(products);
 });

 productRoute.post('/', async(req, res)=> {
    const {
        name, 
        brand, 
        image, 
        price, 
        category, 
        countInStock, 
        description, 
         } = req.body;

        const product = new Product({
            name, 
            brand, 
            image, 
            price, 
            category, 
            countInStock, 
            description,  
        });
        console.log(product);
    
    const newProduct = await product.save();

    if(newProduct) {
        return res.status(201).send({
                msg: 'New product is created',
                data: newProduct
            });
    }
    return res.status(500).send({msg: 'Error in creating Product'})
});

export default productRoute;