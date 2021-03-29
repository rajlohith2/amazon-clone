import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { listProducts } from '../actions/productActions';
import { listTopSellers } from '../actions/UserActions';
import Rating from '../components/Rating';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import Product from '../components/Product';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from 'react-responsive-carousel';

function HomeScreen(props){
   
    const productList = useSelector(state => state.productList);
    const { products, loading, error } = productList;

    const topSellers = useSelector(state => state.topSellers);
    const { users:sellers, loading:loadingSellers, error:errorSellers } = topSellers;
    const dispatch = useDispatch();
    
    useEffect(() => { 
        dispatch(listProducts({}));
        dispatch(listTopSellers());

    },[dispatch]);  
    return ( 
        <div>
            <h2>Top Sellers</h2>
            { loadingSellers ? <LoadingBox />:
                errorSellers ? <MessageBox variant="danger" msg={ errorSellers } /> :
                sellers && sellers.length === 0 ? <MessageBox variant="danger" msg={ errorSellers } />:
                <>
                    <Carousel showArrows autoPlay showThumbs={false} className="carousel">
                        { sellers && sellers.map(seller => (
                            <div key={seller._id}>
                                <Link to={`/seller/${seller._id}`}>
                                    <img src={seller.seller.logo} alt= {seller.seller.name} />
                                    <p className="legend">{ seller.seller.name } </p>
                                </Link>
                            </div>
                        ))}
                    </Carousel>
                </>
            }
            <h2>Featured Products</h2>
            {   loading ? <LoadingBox />:
                error ? <MessageBox variant="danger" msg={ error } />:
                <ul className="row center">
                        {
                        products && products.map(product => <Product product={ product } key={product._id}/>)                              
                        }                        
                </ul>
            }
        </div>
        
    );
}
export default HomeScreen;