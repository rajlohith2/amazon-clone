import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserInfo, userDetails} from "../actions/UserActions";
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';
import { USER_EDIT_RESET } from '../constants/userConstants';

export default function UserEditScreen(props) {
    const userId = props.match.params.id;
  
    const userProfile = useSelector((state) => state.userProfile) ;
    const  {user, loading, error} = userProfile;
    const userUpdate = useSelector((state) =>state.userUpdate);
    const {loading: updateLoading, error:updateError, success:successUpdate} = userUpdate;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const dispatch = useDispatch();

    useEffect( () => {
        if(successUpdate) {
           dispatch({ type:USER_EDIT_RESET });
            props.history.push('/users');
        }
        if(!user) {           
            dispatch(userDetails(userId));
           
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
            setIsSeller(user.isSeller);
        }
    }, [dispatch, userId, user, successUpdate]);
    const updateHandler = (e)=> {
        e.preventDefault();
        dispatch(updateUserInfo({_id: userId, name, email, isAdmin, isSeller}));
    }
    return (
        <div> 
            <form className="form" onSubmit={updateHandler}>
                    
                    <ul className="form-container">
                        <div>
                            <h1>Edit User</h1>
                        </div>
                        { loading ?( <LoadingBox /> ) :(
                          error &&( <MessageBox variant="danger" msg={error} /> ))}

                          { updateLoading && <LoadingBox /> }
                          { updateError && <MessageBox variant="danger" msg={updateError} />}

                            <>
                                <li>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" onChange={(e)=>setName(e.target.value)} value={name} />
                                </li>
                                <li>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                                </li>
                                <li>
                                    <label htmlFor="isSeller">IS Seller</label>
                                    <input type="checkbox" id="isSeller" onChange={ (e)=>setIsSeller(e.target.checked)} checked={isSeller}/>
                                </li>
                                <li>
                                    <label htmlFor="isAdmin">IS Admin</label>
                                    <input type="checkbox" id="isAdmin" onChange={ (e) => setIsAdmin(e.target.checked)} checked={isAdmin}/>
                                </li>
                                <button type="submit" className="primary"> Update </button>
                            </>  
                        
                    </ul>
            </form>
        </div>
    )


}