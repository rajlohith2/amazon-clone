import express, { Router } from "express";
import Product from '../models/Product';
import {isAdmin, isAuth}  from '../middleware/auth';

const productRoute =  express.Router();

productRoute.get('/', async(req, res)=> {
   const products = await Product.find();
   return res.send( products);
});
productRoute.get('/:id', async(req, res)=> {
    
    const products = await Product.findById(req.params.id);
    return res.status(200).send(products);
 });

productRoute.post('/', isAdmin, isAuth, async(req, res)=> {
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

    const newProduct = await product.save();

    if(newProduct) {
        return res.status(201).send({
                msg: 'New product is created',
                data: newProduct
            });
    }
    return res.status(500).send({msg: 'Error in creating Product'});
});

productRoute.put('/:id',isAdmin, isAuth, async(req, res) => {

    const product = await Product.findOne({ _id: req.params.id });   
    if(product) {
        const updatedProduct = await Product.findOneAndUpdate({_id: req.params.id}, req.body);        
        if(updatedProduct) {
            return res.status(201).send({msg: 'Product updated', data: updatedProduct});
        }     
    }
    return res.status(500).send({msg: 'Internal Error in Updating'});
    
});
productRoute.delete('/:id', isAdmin, isAuth, async(req, res)=> {
     const productToDelete = await Product.findById(req.params.id);
     if(! productToDelete) {
         return res.status(404).send({msg: 'Product not found'});
     }
     const deleteProduct = await productToDelete.remove(req.params.id);
     if(deleteProduct) {
         return res.status(200).send({msg: 'Product is deleted'});
     }
     return res.status(500).send({msg: 'Internal Server Error'});
});

export default productRoute;