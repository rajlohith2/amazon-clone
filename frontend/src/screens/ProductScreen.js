import React from 'react';
import { Link } from 'react-router-dom';
import data from '../data';


function ProductScreen(props){
    const product =  data.products.find(product => product._id === parseInt(props.match.params.id));
    return (<div> 
        <div className="back-to-result">      
            <Link to="/">  Back to result </Link>
        </div> 
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
                        status: {product.status}
                    </li>
                    <li>
                        Qty: <select>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                    </li>
                    <li>
                        <button className="button primary">Add to Cart</button>
                    </li>
                </ul>
            </div>
            
        </div>
    </div>
    );
   
}
export default ProductScreen;