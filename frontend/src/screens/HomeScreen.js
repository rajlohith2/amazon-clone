import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Rating from '../components/Rating';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import Product from '../components/Product';

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
                    products && products.map(product => <Product product={ product } />)
                             
                    
                }                        
        </ul>
    );
}
export default HomeScreen;