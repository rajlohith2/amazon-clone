import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import Product from '../components/Product';
import { prices, ratings } from '../utils';
import Rating from '../components/Rating';

export default function SearchScreen(props){
const { name= 'all', category='all', min= 0, max= 0, rating, order='newest'} = useParams();
const dispatch = useDispatch();

const productList = useSelector(state => state.productList);
const { loading, error, products } = productList;
  
const productCategories = useSelector(state => state.productCategoryList);
const { loading:loadingCateg, error:errorCateg, categories }=productCategories;
const getFilterUrl = (filter)=> {
const filterCategory = filter.category || category;
const filterName = filter.name || name;
const filterMin = filter.min ?filter.min: filter.min ===0 ? 0: min;
const filterMax = filter.max || max;
const filterRating = filter.rating || rating;
const sortOrder = filter.order || order;

return `/search/category/${filterCategory}/name/${filterName}/min/${filterMin}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;

}

useEffect (() =>{
    dispatch(listProducts({name: name !=='all' ? name: '', category: category !== 'all' ? category: '', min, max, rating, order}));
}, [category, dispatch, name, max, min, rating,order]);

return (<div> 
            <div className="row">
                {
                loading ?(<LoadingBox />) : error ? (<MessageBox variant="danger" msg={error} />):(
                    <div>{ products.length } Results</div>
                )}
            
                <div>
                    Sort by { ' '}
                    <select value={order}
                        onChange ={(e)=>{
                            props.history.push(getFilterUrl({order: e.target.value}));
                        }}>
                        <option value="newest"> Newest Arrivals</option>
                        <option value="lowest"> Price: Low to High</option>
                        <option value="highest"> Price: High to LOW </option>
                        <option value="toprated"> Avg top rated </option>
                    </select>
                </div>
            </div>   

                <div className="row top">
                    <div className="col-1">
                        <h3>Departments</h3>
                        <div>
                            <ul>
                                <li> 
                                    <Link
                                        className={'all' === category ? 'active': ''}
                                        to={getFilterUrl({ category:'all' })}>
                                          Any
                                    </Link>
                                </li>
                            
                            {loadingCateg ? (<LoadingBox />)  :(errorCateg && (<MessageBox variant="danger" error={errorCateg} /> ))}
                            {
                                categories.map((categ) => (
                                <li key={categ}>
                                    <Link
                                        className={categ === category ? 'active': ''}
                                        to={getFilterUrl({ category:categ })}>
                                        {categ}
                                    </Link>
                                </li>
                                ))
                            } 
                            </ul>
                        </div>
                        <div>
                            <h3>Price</h3>
                            <ul>
                                {
                                    prices.map((p)=>(
                                        <li key={p.name}>
                                            <Link to={getFilterUrl({ min: p.min, max:p.max })}
                                              className={`${p.min} - ${p.max}` === `${min} - ${max}}`?'active':'' }>
                                                  {p.name}
                                            </Link>
                                        </li>      
                                    ))
                                }
                            </ul>

                        </div>
                        <div>
                            <h3>Avg. Customer Review</h3>
                            <ul>
                                {
                                    ratings.map((rate)=>(
                                        <li key={rate.name}>
                                            <Link to={getFilterUrl({ rating: rate.rating })}
                                              className={`${rate.rating}`?'active':'' }>
                                                 <Rating rates={rate.rating} caption={rate.name} />
                                            </Link>
                                        </li>      
                                    ))
                                }
                            </ul>

                        </div>
                        
                    </div>                    
                    <div className="col-3">
                       { loading ?(
                           <LoadingBox />
                       ): error? (
                        <MessageBox variant="danger" msg={error} />
                       ):(
                           <>
                            {products.length ===0 &&(
                                <MessageBox variant="danger" msg={'No Product Found'} />
                                
                            )}
                            <div className="row center">
                                { products.map((product)=>(
                                    <Product key={product._id} product={ product } />
                                ))}
                            </div>
                           </>
                       )} 
                    </div>
                </div>
            </div>
    
    )

}