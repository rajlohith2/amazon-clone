import React from 'react';
import logo from './logo.svg';
import './App.css';
import data from './data';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
}
const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
}

function App() {
  return (
    <BrowserRouter>
    <div className="grid-container">
        
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}> &#9776; </button>
                <a href="index.html">Amazona</a>
            </div>
            <div className="header-links">
                <a href="cart.html">Cart</a>
                <a href="signin.html">   Sign in</a>
            </div>            
        </header>
        <aside className="sidebar">
            <h3>Shopping Categories</h3>
            <button onClick={closeMenu} className="sidebar-close-button">X</button>
            <ul>
                <li>
                    <a href="index.html">Pants</a>
                </li>
                <li>
                    <a href="index.html"> Shirts</a>
                </li>
            </ul>
            
        </aside>
        <main className="main">  
            <div className="content"> 
            <Route path="/product/:id" exact={true} component={ProductScreen} />
            <Route path="/" exact={true} component={HomeScreen} />           
                <ul className="products">
                        {
                            data.products.map( product =>
                                <li>
                                        <div className="product">   
                                        <img src={product.image} alt="" className="product-image"></img>
                                        <div className="product-name"> 
                                            <a href="product.html">{product.name}</a>
                                        </div>
                                        <div className="product-brand"> {product.brand}</div>
                                        <div className="product-price"> ${product.price} </div>
                                        <div className="product-rating"> {product.rating} Stars ({product.numReviews } Reviews) </div>
                                    </div>    
                                </li>
                               
                            ) 
                        }
                        
                    
                         
                     
                </ul>
            </div>            
        </main>
        <footer className="footer">
            &copy Janvier
        </footer>
    </div>
    </BrowserRouter>
  );
}
export default App;

