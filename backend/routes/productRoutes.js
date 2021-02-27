import express, { Router } from "express";
import Product from '../models/Product';
import {isAdmin, isAuth, isSellerOrAdmin}  from '../middleware/auth';
import expressAsyncHandler from "express-async-handler";

const productRoute =  express.Router();

productRoute.get('/', expressAsyncHandler(async(req, res) => {
    
   try {
    const seller = req.query.seller || '';
    const sellerFilter = req.query.seller ? { seller }: {};  
    const products = await Product.find({...sellerFilter}); //  (...) were used to deconstruct {} and only get SELLER
    return res.send(products);
    
   } catch (error) {
       console.log(error.message);
       return res.status(500).send(error.message);
   } 
}));
productRoute.get('/:id', async(req, res)=> {
    try {
        const product = await Product.findById(req.params.id);
        return product ?  res.status(200).send(product): res.status(404).send({message: 'Product not Found'});
    } catch (error) {
              
        return res.status(500).send({message:'Product not found'});
    }
    
 });

productRoute.post('/', isAuth, isSellerOrAdmin, expressAsyncHandler( async(req, res)=> {
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
            seller: req.user._id
        });

    const newProduct = await product.save();

    if(newProduct) {
        return res.status(201).send({
                message: 'New product is created',
                data: newProduct
            });
    }
    return res.status(500).send({message: 'Error in creating Product'});
}));

productRoute.put('/:id', isAuth, isSellerOrAdmin, async(req, res) => {
    
    const product = await Product.findOne({ _id: req.params.id });   
    if(product) {
        const updatedProduct = await Product.findOneAndUpdate({_id: req.params.id}, req.body);        
        if(updatedProduct) {
            return res.status(201).send({message: 'Product updated', data: updatedProduct});
        }     
    }
    return res.status(500).send({message: 'Internal Error in Updating'});
    
});
productRoute.delete('/:id', isAuth,isAdmin, async(req, res)=> {
     const productToDelete = await Product.findById(req.params.id);
     if(! productToDelete) {
         return res.status(404).send({message: 'Product not found'});
     }
     const deleteProduct = await productToDelete.remove(req.params.id);
     if(deleteProduct) {
         return res.status(200).send({message: 'Product is deleted'});
     }
     return res.status(500).send({message: 'Internal Server Error'});
});


export default productRoute;