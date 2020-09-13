import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
  
import { saveProduct, listProducts, deleteProduct } from "../actions/productActions";
import { useSelector, useDispatch } from 'react-redux';


function ProductsScreen(props){

    const [modalVisible, setModalVisible] = useState(false);
    
    const [ id, setId] = useState('');
    const [ name, setName]  = useState('');
    const [ price, setPrice] = useState(0);
    const [ image, setImage] = useState('');
    const [ brand, setBrand] = useState('');
    const [ category, setCategory] = useState('');
    const [ description, setDescription] = useState('');
    const [ countInStock, setCountInStock] = useState(0);

    const productList = useSelector(state => state.productList);
    const {loading, products, error} = productList;


    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const {loading:loadingDelete,  success: successDelete, error: errorDelete } = productDelete;

    const dispatch = useDispatch();
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id:id, name, price, brand, image, description, countInStock, category }));

    };
    const deleteHandler = (product) => {
        dispatch(deleteProduct(product._id));
    };

    useEffect(()=> {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts());
        return () => {

        }
    }, [successSave, successDelete]);

    const openModal = (product) => {
        setModalVisible(true);
        setId(product._id);
        setName(product.name);
        setPrice(product.price);
        setBrand(product.brand);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
        setImage(product.image);
    } 
    
    
    return ( 
        <div className="content content-margined">
            <div className="product-header">
                <h3>Products</h3>
                <button onClick={()=>openModal({})}>Create Product</button>
            </div>
            { modalVisible && 
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
                            <input type="text" name="name" id="name" value={name} onChange={(e)=> setName(e.target.value)} />
                        </li>

                        <li>
                            <label htmlFor="price">  Price </label>                          
                            <input type="text" name="price" id="price" value={price} onChange={(e)=> setPrice(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="brand">  brand </label>                          
                            <input type="text" name="brand" id="brand" value={brand} onChange={(e)=> setBrand(e.target.value)} />
                        </li>
                        <li>
                            <label htmlFor="category">  Category </label>                          
                            <input type="text" name="category" id="category" value={category} onChange={(e)=> setCategory(e.target.value)} />
                        </li>
                        
                        <li>
                            <label htmlFor="countInStock">  CountInStock </label>                          
                            <input type="text" name="countInStock" id="countInStock" value={countInStock} onChange={(e)=> setCountInStock(e.target.value)} />
                        </li>
                        
                        <li>
                            <label htmlFor="image">  Image </label>                          
                            <input type="text" name="image" id="image" value={image} onChange={(e)=> setImage(e.target.value)} />
                        </li>
                        
                        
                        <li>
                            <label htmlFor="description">  Description </label>                          
                            <textarea name="description" id="description" value={description} onChange={(e)=> setDescription(e.target.value)}>
                            
                            </textarea>
                        </li>
                        
                        
                        <li>
                            <button className="button primary" type="submit"> {id? 'Update' : 'Create'} </button>
                        </li>
                        <li>
                            <button className="button secondary" onClick={()=>setModalVisible(false)}> Back </button>
                        </li>
                        
                    </ul>
                 </form>
            </div>
        }
    
            <div className="product-list">
                
                    { error && <div>{error}</div> }
                    { loading && <div>Loadig ...</div> }
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Category</th>
                            <th>Brand</th>
                            <th>Action</th>
                        </tr>   
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                            <tr>
                                <td key={product._id}>    {product._id}       </td>
                                <td>    {product.name}      </td>
                                <td>    {product.price}     </td>
                                <td>    {product.category}  </td>
                                <td>    {product.brand}     </td>
                                <td>
                                    <button onClick={ () =>openModal(product)}> Edit   </button>
                                    <button onClick={ () => deleteHandler(product)}> Delete     </button>
                                </td>
                            </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
       
    );
   
}
export default ProductsScreen;