import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { userDetails } from '../actions/UserActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import Product from '../components/Product';
import Rating from '../components/Rating';

export default function SellerScreen(props){
    const sellerId = props.match.params.id
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile);
    const { loading, error, user} = userProfile;
    
    const productList = useSelector(state => state.productList);
    const { loading:loadingProducts, error:errorProducts, products } = productList;
//
    useEffect(() => {
        dispatch(userDetails( sellerId ));
        dispatch(listProducts({ seller: sellerId }));

    },[dispatch, sellerId]);
  
    return(
    
       <div className="row top">
            <div className="col-1">

            </div>
            <div className="col-3">
                { 
                    loading ? (
                        <LoadingBox />
                    ): error ? (
                        <MessageBox variant="danger" msg={error} />
                    ):(
                        <ul className="card card-body">
                            <li>
                                <div className="row">
                                    <div> { 
                                            user.seller && <img src={user.seller.logo} alt={user.seller.name}/>
                                        }
                                        
                                    </div>
                                    <div>
                                        <h1>{user.seller.name}</h1>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <Rating value={user.seller.rating} numReviews={user.seller.numReviews} />
                            </li>
                            <li>
                                <a href={`mailto:${user.email}`}> Contanct Seller</a>
                            </li>
                            <li>  {user.seller.description}  </li>
                        </ul>
                    )
                }
            </div>
            <div className="col-3">
                {
                    loadingProducts ? (<LoadingBox />) : (
                       errorProducts ? <MessageBox variant="danger" msg={errorProducts} /> : (
                        products.length === 0 ? (<MessageBox variant="danger" msg={'No product found'} /> ): (
                            <ul className="card card-body">
                                <li>
                                    <div className="row center">
                                        { products && products.map(product=>(
                                            <Product key={product._id} product={ product} />
                                        ))}
                                    </div>
                                </li>
                            </ul>
                        )
                       )
                    )
                }
            </div>
        </div>
        
    )
   
} 