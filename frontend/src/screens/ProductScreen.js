import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {  createReview, detailsProduct } from "../actions/productActions";
import { useSelector, useDispatch } from 'react-redux';
import Rating from '../components/Rating';
import { MessageBox } from '../components/MessageBox';
import { LoadingBox } from '../components/LoadingBox';
import Product from '../components/Product';
import { PRODUCT_REVIEW_CREATE_RESET } from '../constants/productConstants';

function ProductScreen(props){
    const productId = props.match.params.id;
    const [qty, setQty] =  useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const {  loading, product, error} = productDetails;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const proCreateReview = useSelector(state => state.productCreateReview);
    const {loading:loadingReview, error: errorReview,  success: reviewSuccess} = proCreateReview; 

    const [rating, setRating] = useState(0);
    const [comment, setComment] =  useState('');
    const dispatch = useDispatch();

    useEffect(()=> {
        if(reviewSuccess) {
            window.alert('Review Submitted Successfully');
            setRating(' ');
            setComment('');
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET});
        }
        dispatch(detailsProduct(productId));
  
    },[dispatch, productId])
    const handleAddToCart = () => {
        props.history.push("/cart/"+ productId + "?qty=" + qty)
    }
    const submitHandler = (e) => {
        e.preventDefault();
        if(comment && rating){
            dispatch(createReview(productId, {rating, comment, name:userInfo.name}));
        }else {
            alert('Please enter comment and rating');
        }
    };
   
    return (
            <div>
                {loading ? (
                    <LoadingBox />
                ): error ? (<MessageBox variant="danger" msg={error} />):(
                    <div>
                        <Link to='/'>Back To result </Link>
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
                            <div className="col-1">
                                <div className="card card-body">
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
                                                <li>
                                                    <button
                                                        onClick={handleAddToCart}
                                                        className="primary block"
                                                    >
                                                        Add to Cart
                                                    </button>
                                                </li> 
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 id="reviews">Reviews</h2>
                            { product.reviews && product.reviews.length === 0 && (
                                <MessageBox msg={'There is no views'} />
                            )}
                            <ul>
                                    {product.reviews && product.reviews.map((review)=>(
                                    
                                        <li key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating rates={review.rating} caption=" " />
                                            <p>
                                                {review.createdAt.substring(0, 10)}
                                            </p>
                                            <p>
                                                {review.comment}
                                            </p>
                                        </li>
                                   ))}
                                        <li>
                                            {userInfo?(
                                                
                                                <form onSubmit={submitHandler} className="form-rate">
                                                    <div>
                                                        <h2>Write a customer review</h2>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="rating">Rating</label>
                                                        <select value={rating}
                                                                onChange={(e)=>setRating(e.target.value)}>
                                                                    <option value="">Select...</option>
                                                                    <option value="1">1- Poor</option>
                                                                    <option value="2">2- Fair</option>
                                                                    <option value="3">3- Good</option>
                                                                    <option value="4">4- Very Good</option>
                                                                    <option value="5">5- Excellent</option>

                                                        </select>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="comment">Comment</label>
                                                        <textarea id="comment" value={comment} onChange={(e)=> setComment(e.target.value)}></textarea>
                                                    </div>
                                                    <div>
                                                        <label />
                                                        <button className="primary" type="submit"> Submit</button> 
                                                    </div>
                                                    <div>
                                                        {loadingReview && <LoadingBox />}
                                                        {errorReview && <MessageBox variant="danger" msg={errorReview}/>}
                                                    </div>
                                                    
                                                </form>
                                               
                                                
                                            ):(
                                                <MessageBox>Please <Link to="/signin">Sign in</Link>to write a review</MessageBox>
                                            )}
                                        </li>
                                        
                               
                            </ul>
                        </div>
                    </div>
                )}
            </div>
   
    )}
export default ProductScreen;