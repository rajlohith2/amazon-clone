import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  detailsProduct } from "../actions/productActions";
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import { MessageBox } from '../components/MessageBox';
import { LoadingBox } from '../components/LoadingBox';
import Product from '../components/Product';

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
                {loading ? (
                    <LoadingBox />
                ): error ? (<MessageBox variant="danger" msg={error} />):(
                    <div className="row top">
                        <div className="col-2">
                            <img src={product.image} alt={product.name} className="large" />
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                            </div>
                            <ul>
                                <li>
                                    <h1>{product.name}</h1>
                                </li>
                                <li><Rating rates={product.rating} numReviews={product.numReviews} />  </li>
                                <li>Price: ${product.price}</li>
                                <li>Description:
                                    <p>{ product.description } </p>
                                </li>
                            </ul>                            
                        </div>
                        <div class="col-1">
                            <div class="card card-body">
                                <ul>
                                    <li> 
                                        Seller { ` `} 
                                        { product.seller &&
                                            <>
                                                <h2> 
                                                    <Link to={`/Seller/${product.seller._id}`}> {product.seller.seller.name} </Link>
                                                </h2>
                                                <Rating numReviews={product.seller.seller.numReviews} rates={product.seller.seller.ratings} />
                                            </>
                                        }
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Price</div>
                                            <div className="price"> ${product.price}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Status</div>
                                            <div>
                                                { product.countInStock > 0 ? <span className="success"> In Stock</span>:
                                                    <span className="danger"> Unavailable </span>                                                
                                                }
                                             </div>
                                        </div>
                                    </li>
                                    {product.countInStock > 0 && (
                                        <>
                                            <li>
                                                <div className="row">
                                                    <div>Qty</div>
                                                        <div>
                                                            <select name="" id="" value={qty} onChange={(e)=>setQty(e.target.value)}>
                                                                {
                                                                [...Array(product.countInStock).keys()].map(value=> (
                                                                    <option key={value + 1} value={value + 1} >  {value + 1} </option>
                                                                ))
                                                                }
                                                            </select>
                                                        </div>
                                                        
                                                </div>                                               
                                            </li>    
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
   
    )}
export default ProductScreen;