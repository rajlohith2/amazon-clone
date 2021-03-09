import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import Product from '../components/Product';

export default function SearchScreen(props){
const { name= 'all' } = useParams();
const dispatch = useDispatch();

const productList = useSelector(state => state.productList);
const { loading, error, products } = productList;

useEffect (() =>{
    dispatch(listProducts({name: name !=='all' ? name: ''}));
}, [dispatch, name]);
return (<> 
            <div className="row">
                {
                loading ?(<LoadingBox />) : error ? (<MessageBox variant="danger" msg={error} />):(
                    <div>{ products.length } Results</div>
                )}
                <div className="row top">
                    <div className="col-1">
                        <h3>Departments</h3>
                        <ul>
                            <li> Category 1</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        {loading ?( <LoadingBox />) : error ? (<MessageBox variant="danger" msg={error} />):
                         (
                             products.length === 0 ?(<MessageBox variant="warning" msg={'No product Found'} />):(
                             products.map(product => <Product key={product._id} product={ product } />)                              
                            
                             )
                         )
                        }

                    </div>
                </div>
            </div>
   </>
)

}