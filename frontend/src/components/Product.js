import React, { useEffect} from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

export default function Product({product}) {
   
    return ( 
        <li key={product._id}>
                <div className="product"> 
                <Link to={`/product/${product._id}`}>
                        <img src={product.image} alt="" className="product-image small"></img>
                </Link>  
                <div className="product-name"> 
                    <Link to={`/product/${product._id}`}> {product.name} </Link>
                </div>
                <div className="product-brand"> {product.brand}</div>
                <Rating rates={product.rating} numReviews={product.numReviews} />
                <div className="product-price"> ${product.price} </div>
                <div> 
                    { product.seller &&
                        <Link to={`/seller/${product.seller._id}`}>
                            {product.seller.seller.name}
                        </Link>
                    }
            
                </div>  

            </div>    
         </li>
    )

 }
