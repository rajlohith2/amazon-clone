import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  detailsProduct } from "../actions/productActions";
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import { MessageBox } from '../components/MessageBox';
import { LoadingBox } from '../components/LoadingBox';

function ProductScreen(props){
    const productId = props.match.params.id;
    const [qty, setQty] =  useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {  loading, product, error} = productDetails;
    const dispatch = useDispatch();

    useEffect(()=> {
        dispatch(detailsProduct(productId));
  
    },[dispatch, productId])
    const handleAddToCart = () => {
        props.history.push("/cart/"+ productId + "?qty=" + qty)
    }

    return (
    <div> 
        <div className="back-to-result">      
            <Link to="/">  Back to result </Link>
        </div> 
            {       
                loading ?  <LoadingBox /> :
                error ? <MessageBox variant="danger" msg={ error } /> :
                ( product && 
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
                                    <Rating rates={product.rating} numReviews={product.numReviews} />
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
                                    Price: ${product.price}
                                </li>
                                <li>
                                    status: {product.countInStock > 0 ?<span className="text-success"> In Stock </span>  : <span className="text-danger">Unavailable</span>}
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