import express from "express";
import User from '../models/userModel';
import {getToken, isAuth}  from '../middleware/auth';
import  bcrypt  from "bcrypt";
const route =  express.Router();

route.post('/signin', async(req, res) => { 
   try {
        const { email, password } = req.body;        
        const loggedUser = await User.findOne({email: email});  
        
         if(!loggedUser){
            return res.status(404).send({ message: 'User not found' })
         } else {
                if(bcrypt.compareSync(password, loggedUser.password)) {
                    const {_id, name, email, isAdmin}= loggedUser;
                    return res.status(200).send({ _id, name,email, isAdmin,token:getToken(loggedUser)})
                }else {
                    return res.status(404).send({message: 'Invalid user name or passwod'});
                }
         }
   } catch (error) {     
        return res.status(500).send({error: error.message, message:"internal server error"});
   }     
});
route.post('/register', async (req, res)=>{
    try {
    const {name, email, password} = req.body;
   
    const user = new User({
        name,
        email,
        password: await bcrypt.hashSync(password, 10)
    });
    const newUser = await user.save();
    return newUser ? res.status(200).send({user:newUser, token:getToken(user)}) : res.status(404).send({message: 'invalid user data'});
        
    } catch (error) {
       return res.status(500).send({message: error.message}); 
    }
    
});

route.get('/createadmin', async(req, res) => {
    
    try {
        const user = new User({
            name: 'Janvier',
            email:'Janvier1@example.com',
            password: 'safepassword',
            isAdmin: true
        });
        const newUser = await user.save();
        return res.send(user);
        
    } catch (error) {
        res.send({msg: error.message});
    }
});

route.get('/all', async(req, res)=> {
    return res.send({data: await User.find()});
});

route.get('/admins',async(req, res)=>{
    return res.send({data: await User.find({isAdmin:true})});
});
route.get('/:id/details', isAuth, async(req, res)=> {   
        const user = await User.findById(req.params.id)
        return user ? res.status(200).send(user):res.status(404).send({message: 'User Not found'}); 
});

route.put('/profile', isAuth, async(req, res)=> {
    console.log(req.body.password);
    try {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name;
        user.email = req.body.email;
        if(req.body.password) {
            user.password = bcrypt.hashSync(req.body.password, 8);            
        }
        const updatedUser = await user.save();
        const {_id, name, email, isAdmin} = updatedUser;
        return res.status(200).send({_id, name, email, isAdmin, token:getToken(updatedUser)});

    }
    } catch (error) {
        return res.send({error: error.message, message: 'internal serve error'})
    }
    
});

export default route;