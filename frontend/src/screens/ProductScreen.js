import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  detailsProduct } from "../actions/productActions";
import { useSelector, useDispatch } from 'react-redux';

function ProductScreen(props){

    const [qty, setQty] =  useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {  loading, product, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(detailsProduct(props.match.params.id));
        return () => {

        }
    },[])
    const handleAddToCart = () => {
        props.history.push("/cart/"+ props.match.params.id + "?qty=" + qty)
    }

    return (
    <div> 
        <div className="back-to-result">      
            <Link to="/">  Back to result </Link>
        </div> 
            {       
                loading ?  <div>Please wait...</div> :
                error ? <div> { error } </div> :
                (
                    <div className="details">
                        <div className="details-image">
                            <img src={product.image} alt="product"></img>
                        </div>
                        
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    {product.rating} stars {product.numReviews} Reviews
                                </li>
                                <li>
                                    <b>${product.price} </b>
                                </li>
                                <li>
                                    Description:
                                    <b>{product.description} </b>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Price: {product.price}
                                </li>
                                <li>
                                    status: {product.countInStock > 0 ? 'In Stock' :'Unavailable'}
                                </li>
                                <li> 
                                    Qty: <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                             {[...Array(product.countInStock).keys()].map(stock => 
                                               <option key={stock+1} value={ stock+1 }>{ stock + 1 }</option>
                                            )}
                                        </select>
                                </li>
                                <li>{
                                        product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary">Add to Cart</button>
                                        
                                    }
                                    
                                </li>
                            </ul>
                        </div>
                
                    </div>
                )
            }
        
    </div>
    );
   
}
export default ProductScreen;