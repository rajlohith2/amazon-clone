import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

function HomeScreen(props){
   
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;
    const dispatch = useDispatch();
    
    useEffect(() => { 
        dispatch(listProducts({}));

    },[dispatch]);  
    return ( loading ? <LoadingBox />:
             error ? <MessageBox variant="danger" msg={ error } />:
        <ul className="products">
                {  
                    products.map(product =>
                        <li key={product._id}>
                                <div className="product"> 
                                <Link to={`/product/${product._id}`}>
                                     <img src={product.image} alt="" className="product-image"></img>
                                </Link>  
                                <div className="product-name"> 
                                    <Link to={'/product/ '+ product._id } >{product.name}</Link>
                                </div>
                                <div className="product-brand"> {product.brand}</div>
                                <div className="product-rating"> {product.rating} Stars ({product.numReviews } Reviews) </div>
                                <Rating rates={product.rating} numReviews={product.numReviews} />
                                <div className="product-price"> ${product.price} </div>

                            </div>    
                        </li>
                        
                    ) 
                }                        
        </ul>
    );
}
export default HomeScreen;