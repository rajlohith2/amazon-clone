import React, {useEffect} from 'react';
import './App.css';
import data from './data';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen  from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import { useDispatch, useSelector } from 'react-redux';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import { signout } from './actions/UserActions';
import { user } from './config/userInfo';
import OrderScreen from './screens/OrderScreen';
import OrderHistory from './screens/OrderHistory';
import ProfileSCreen from './screens/ProfileScreen';
import PrivateRoute from './components/PrivateRoute';
import { useState } from 'react';
import AdminRoute from './components/AdminRoute';
import OrdersListScreen from './screens/OrdersListScreen';
import UserListScreen from './screens/UsersListScreen';
import UserEditScreen from './screens/UserEditScreen';
import SellerRoute from './components/SellerRoute';
import SellerScreen from './screens/SellerScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
 
const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
}
const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
}

function App() {
    const cartInfo = useSelector(state=>state.cart);
    const { cartItems } = cartInfo;
    const { userInfo } = useSelector(state => state.userSignin);    
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const signoutHandler = () => dispatch(signout());       
    useEffect(() =>  setUser(userInfo) )
    
    
  return (
    <BrowserRouter>
    <div className="grid-container">
        
        <header className="header">
            <div className="brand">
                <button onClick={openMenu}> &#9776; </button>
                <Link to="/">Amazona </Link>
            </div>
            <div>
                 <Route render={({history})=> <SearchBox history={history} />} ></Route>
            </div>
            <div className="header-links">
                <Link to="/cart"> Cart { cartItems && cartItems.length > 0 &&  <span className="badge">{cartItems.length}</span>}</Link>  
                {  user ?(
                    <div className="dropdown">
                        <Link to="/">
                            {user.name} <i className="fa fa-caret-down"></i>
                        </Link>
                        <ul className="dropdown-content">
                            <li>
                            <Link to="/profile">User Profile</Link>
                            </li>
                            <li>
                                 <Link to="/orderhistory">Order History</Link>
                            </li>
                            <li>
                            <a onClick={signoutHandler}>
                                Sign Out
                            </a>
                            </li>
                        </ul>
                    </div>
                    
                   ):(
                    <Link to="/signin"> Sign in </Link>  

                    )}
                    {userInfo && userInfo.isSeller &&(
                        <div className="dropdown">
                            <Link to="/#admin"> Seller <i className="fa fa-caret-down"></i>
                            </Link>
                         <ul className="dropdown-content">                             
                             <li><Link to="/products/seller"> Products </Link></li>
                             <li><Link to="/orders/seller"> Orders </Link></li>                             
                         </ul>   
                        </div>

                    )}
                    {userInfo && userInfo.isAdmin &&(
                        <div className="dropdown">
                            <Link to="/#admin"> Admin <i className="fa fa-caret-down"></i>
                            </Link>
                         <ul className="dropdown-content">
                             <li><Link to="/dashboard"> Dashboard </Link></li>
                             <li><Link to="/products"> Products </Link></li>
                             <li><Link to="/orderlist"> Orders </Link></li>
                             <li><Link to="/users"> Users </Link></li>
                         </ul>   
                        </div>

                    )}
                    
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
                {/* <Route path="/products" component={ProductsScreen} /> */}
                <Route path="/seller/:id" component={SellerScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                
                <Route path="/shipping" component={ShippingScreen} />
                <Route path="/cart/:id?" component={CartScreen} /> 
                <Route path="/" exact={true} component={HomeScreen} />    
                <Route path="/signin" component={SigninScreen} />   
                <Route path="/register" component={RegisterScreen} />
                <Route path="/payment" component={PaymentScreen} /> 
                <Route path="/placeorder" component={PlaceOrderScreen} />   
                <Route path="/order/:id" component={OrderScreen} />   
                <Route path="/orderHistory" component={OrderHistory} />

                <Route path="/search/name/:name?" component={SearchScreen} exact />   
                <PrivateRoute path="/profile" component={ProfileSCreen} /> 

                <AdminRoute path="/products" component={ProductsScreen} exact />
                <AdminRoute path="/orderlist" component={OrdersListScreen} exact />
                <AdminRoute path="/users" component={UserListScreen} />                
                <AdminRoute path="/user/:id/edit" component={UserEditScreen} />
                
                <SellerRoute path="/products/seller" component={ProductsScreen}  />
                <SellerRoute path="/orders/seller" component={OrdersListScreen} />
               
                
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

