import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, eraseUser } from '../actions/UserActions';
import { LoadingBox } from '../components/LoadingBox';
import { MessageBox } from '../components/MessageBox';

export default function UserListScreen(props) {
    const list = useSelector(state => state.users);
    const { users, error, loading } = list;

    const deleteUser = useSelector(state =>state.deleteUser);
    const { loading:deleteLoading, success:deleteSuccess, error:deleteError } = deleteUser;  //dl= deleteLoading, deleteSuccess dE:deleteError
    const dispatch = useDispatch();
   
    useEffect(()=> {
        dispatch(listUsers());
    },[dispatch, deleteSuccess]);
    
    const handleDelete= (user) => {
        if(window.confirm('Are you sure you want to delete ?')){
           dispatch(eraseUser(user._id));
        }
    }
    return( 
            <div>
                <h1>Users </h1>
                {loading && <LoadingBox />}
                {error && <MessageBox variant="danger" msg={error} />}

                {deleteLoading && <LoadingBox />}
                {deleteError && <MessageBox variant="danger" msg={deleteError} />}
                {deleteSuccess && <MessageBox variant="success" msg={`User deleted successfully`} />}

                <table className="table">
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> NAME </th>
                            <th> EMAIL </th>
                            <th> IS ADMIN </th>
                            <th> IS SELLER </th>
                            <th> ACTIONS </th>
                        </tr>
                    </thead>
                        <tbody>
                            { users &&
                                users.map((user) =>(
                                   <tr key={user._id}>
                                       <td> {user._id}   </td>
                                       <td>{user.name}</td>
                                       <td>{user.email}</td>
                                       <td>{user.isAdmin ? `Yes` : `No`}</td>
                                       <td>{user.isSeller ? 'Yes': 'No'}</td>
                                       <td>
                                           <button className="small" type="button" onClick={()=> props.history.push(`/user/${user._id}/edit`)}>Edit</button>
                                           <button className="small" onClick={()=>handleDelete(user)}>Delete</button>
                                       </td>
                                   </tr>
                                ))
                            }
                            
                        </tbody>
                    
                </table>
                
            </div>
    )
}