import express, { Router } from "express";
import Product from '../models/Product';
import {isAdmin, isAuth, isSellerOrAdmin}  from '../middleware/auth';
import expressAsyncHandler from "express-async-handler";

import User from "../models/userModel";
import data from '../data';

const productRoute =  express.Router();

productRoute.get('/', expressAsyncHandler(async(req, res) => {
    
   try {
    const seller = req.query.seller || '';
    const name = req.query.name || '';
    const category = req.query.category || '';
    const order = req.query.order || '';
    const min = req.query.min && Number(req.query.min) !== 0 ? Number(req.query.min): 0;
    const max = req.query.max && Number(req.query.max) !== 0 ? Number(req.query.max): 0;
   const rating = req.query.rating && Number(req.query.rating) !==0 ? Number(req.query.rating): 0;
    
    
    const sellerFilter = seller ? { seller }: {};  
    const categoryFilter = category ? { category }: {};  
    const nameFilter = name ? { name: {$regex: name, $options: 'i'} }: {}; 
    const priceFilter = min && max ? {price: {$gte: min, $lte: max}}: {};
    const ratingFilter = rating ? {rating: {$gte: rating } }:{};
    const sortOrder = 
     order === 'lowest'? {price: 1}:
     order === 'highest'? {price: -1}:
     order === 'toprated'?{rating: -1}:
     {_id: -1};

     const pageSize = 10;
     
     const page = Number(req.query.pageNumber) || 1;
     const count = await Product.estimatedDocumentCount({...sellerFilter, ...nameFilter, ...categoryFilter, ...priceFilter, ...ratingFilter});

    const products = await Product.find({...sellerFilter, ...nameFilter, ...categoryFilter, ...priceFilter, ...ratingFilter})
     .populate('seller', 'seller.name seller.logo').sort(sortOrder)      
     .skip(pageSize * (page - 1))
     .limit(pageSize);
     return res.send({         
         products,
         page,
         pages: Math.ceil(count/pageSize)
     });
    // return res.status(200).send({products, page, pages: Math.ceil(count/pageSize)});
    
   } catch (error) {
       console.log('Hello', error.message);
       return res.status(500).send(error.message);
   } 
}));
productRoute.get('/categories', expressAsyncHandler(async(req, res) => {
    
    try {
     const categories = await Product.find().distinct('category');
     return res.send(categories);
     
    } catch (error) {
        console.log(error.message);
        return res.status(500).send(error.message);
    } 
 }));

 productRoute.post('/:id/reviews', isAuth, expressAsyncHandler(async(req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        if(product.reviews.find(x=> x.name == req.user.name)){
            return res.status(400).send({message: 'You have already reviewed'});
        }
        const review = {
            name: req.user.name,
            comment: req.body.comment,
            rating: Number(req.body.rating)
        };
        product.reviews.push(review);
        
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((a, c)=> a + c.rating, 0) / product.reviews.length;
        
        const updatedProduct = await product.save();
      
        return res.status(201).send({
            message: 'Review Created',
            review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        });
    } else{ 
        return res.status(404).send({message: 'Product Not Found'});
    }
 })
 );
productRoute.get('/:id', async(req, res)=> {
    
    try {
        const product = await Product.findById(req.params.id).populate('seller', 'seller.name seller.logo seller.numReviews seller.rating');
         
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
productRoute.post('/seed', async(req, res)=>{
    const seller = await User.findOne({isSeller: true});
    if(seller){
        const products = data.products.map(product =>({
            ...product, seller: seller._id
        }));
        const createdProduct = await Product.insertMany(products);
        return res.status(200).send({ createdProduct });
    }else{
        return res.status(500).send({message: 'No seller Found first run /api/users/seed'});
    }
})

export default productRoute;