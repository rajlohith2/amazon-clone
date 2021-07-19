import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
  
import { saveProduct, listProducts, deleteProduct } from "../actions/productActions";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";
import { useSelector, useDispatch } from 'react-redux';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { headers } from '../config/userInfo';
import axios from "axios";
import { PROD_URL } from '../config/shipping';
 

function ProductsScreen(props){
    const {pageNumber = 1} = useParams();
    const sellerMode = props.match.path.indexOf('/seller') >= 0;

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
    const {loading, products, error, pages, page} = productList;


    const productSave = useSelector(state => state.productSave);
    const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

    const productDelete = useSelector(state => state.productDelete);
    const {loading:loadingDelete,  success: successDelete, error: errorDelete } = productDelete;
    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const dispatch = useDispatch(); 
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveProduct({_id:id, name, price, brand, image, description, countInStock, category }));

    };
    const deleteHandler = (product) => {
        if(window.confirm('Are you sure you want to delete?')){
             dispatch(deleteProduct(product._id));
        }
    };
    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const handleImageUpload = async (e)=>{
        e.preventDefault();
        const file = e.target.files[0];
        const bodyFormData = new FormData();        
        bodyFormData.append('imageFile', file);        
        setLoadingUpload(true);
        try {
            const contentType = {'Content-Type': 'multipart/form-data'};
            
             const { data } = await axios.post(`/${PROD_URL}/uploads`, bodyFormData, {...headers, ...contentType});
             setImage(data);
             setLoadingUpload(false);
        } catch (error) {
            setErrorUpload(error.message);
            setLoadingUpload(false);
            
        }
    }

    useEffect(() => {
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listProducts({seller: sellerMode ? userInfo._id: '', pageNumber}));
       if(successDelete){
           dispatch({type: PRODUCT_DELETE_RESET});
       }
    }, [successSave, successDelete, pageNumber]);

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
                        { loadingSave && <LoadingBox />}
                        { errorSave && <MessageBox variant="danger" msg={errorSave}/> }
                        
                        { loadingDelete && <LoadingBox />}
                        { errorDelete && <MessageBox variant="danger" msg={errorDelete}/> }
                        
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
                            <label htmlFor="imageFile">  Image File </label>                          
                            <input type="file" name="imageFile" id="imageFile" label="Choose Image" onChange={handleImageUpload} />
                            {loadingUpload && <LoadingBox />}
                            {errorUpload && <MessageBox variant="danger" msg={errorUpload} />}
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
                
                    { error && <MessageBox variant="danger" msg={error} /> }
                    { loading && <LoadingBox />}

                {
                    !modalVisible &&(
                        <>
                            <table className="table">
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
                                    products && products.map(product => (
                                        <tr key={product._id}>
                                            <td>    {product._id}       </td>
                                            <td>    {product.name}      </td>
                                            <td>    {product.price}     </td>
                                            <td>    {product.category}  </td>
                                            <td>    {product.brand}     </td>
                                            <td>
                                                <button className="button" onClick={ () =>openModal(product)}> Edit   </button>
                                                {''}
                                                <button className="button" onClick={ () => deleteHandler(product)}> Delete     </button>
                                            </td>
                                        </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className="row center pagination "> 
                            {
                                [...Array(pages).keys()].map(x => (                                    
                                    <Link to= {`/products/pageNumber/${x+1}`}> {x+1} </Link>                                
                                 
                                ))
                            }
                            </div>
                        </>
                    )
                    
                }
                <Link to= {`/signin`}> Go to </Link>                                 
                
            </div>
        </div>
       
    );
   
}
export default ProductsScreen;