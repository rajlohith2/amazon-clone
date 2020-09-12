import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
  
import { saveProduct } from "../actions/productActions";
import { useSelector, useDispatch } from 'react-redux';


function ProductsScreen(props){

    const [ name, setName]  = useState('');
    const [ price, setPrice] = useState(0);
    const [ image, setImage] = useState('');
    const [ brand, setBrand] = useState('');
    const [ category, setCategory] = useState('');
    const [ description, setDescription] = useState('');
    const [ countInStock, setCountInStock] = useState(0);

    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const dispatch = useDispatch();
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({name, price, brand, image, description, countInStock, category }));

    };

    useEffect(()=> {
        
        return () => {

        }
    },[]) 
    

    return ( 
        <div className="form">
            <form onSubmit={submitHandler}>
                <ul className="form-container">
                    <li>
                        <h2>Product Registration</h2>
                    </li>
                    <li>
                    { loadingSave && <div>Loading...</div> }
                    { errorSave && <div> { errorSave } </div> }
                    
                    </li>
                    <li>
                        <label htmlFor="name">  Name </label>                          
                        <input type="text" name="name" id="name" onChange={(e)=> setName(e.target.value)} />
                    </li>

                    <li>
                        <label htmlFor="price">  Price </label>                          
                        <input type="text" name="price" id="price" onChange={(e)=> setPrice(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="brand">  brand </label>                          
                        <input type="text" name="brand" id="brand" onChange={(e)=> setBrand(e.target.value)} />
                    </li>
                    <li>
                        <label htmlFor="category">  Category </label>                          
                        <input type="text" name="category" id="category" onChange={(e)=> setCategory(e.target.value)} />
                    </li>
                    
                    <li>
                        <label htmlFor="countInStock">  CountInStock </label>                          
                        <input type="text" name="countInStock" id="countInStock" onChange={(e)=> setCountInStock(e.target.value)} />
                    </li>
                    
                    <li>
                        <label htmlFor="image">  Image </label>                          
                        <input type="text" name="image" id="image" onChange={(e)=> setImage(e.target.value)} />
                    </li>
                    
                    
                    <li>
                        <label htmlFor="description">  Description </label>                          
                        <textarea name="description" id="description" onChange={(e)=> setDescription(e.target.value)}>
                        
                        </textarea>
                    </li>
                    
                    
                    <li>
                        <button className="button primary" type="submit"> Create </button>
                    </li>
                    
                </ul>
            </form>
        </div>
    
    );
   
}
export default ProductsScreen;