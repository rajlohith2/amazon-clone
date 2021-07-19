import express from "express";
import User from '../models/userModel';
import {getToken, isAuth, isAdmin}  from '../middleware/auth';
import  bcrypt  from "bcrypt";
import expressAsyncHandler from "express-async-handler";
const route =  express.Router();

route.post('/signin', async(req, res) => { 
   try {
        const { email, password } = req.body;        
        const loggedUser = await User.findOne({email: email});  
        
         if(!loggedUser){
            return res.status(404).send({ message: 'Invalid Email or Password ' })
         } else {
                if(bcrypt.compareSync(password, loggedUser.password)) {
                    const {_id, name, email, isAdmin, isSeller} = loggedUser;
                    return res.status(200).send({ _id, name,email, isAdmin, isSeller, token:getToken(loggedUser)});
                }else {
                    return res.status(404).send({message: 'Invalid Credentials'});
                }
         }
   } catch (error) {     
        return res.status(500).send({error: error.message, message:"Internal Server Error"});
   }     
});
route.post('/register', async (req, res)=>{
    try {
    const {name, email, password} = req.body;
   
    const user = new User({  name,
        email,
        password: await bcrypt.hashSync(password, 10)
    });
    const newUser = await user.save();
    return newUser ? res.status(200).send({user:newUser, token:getToken(user)}) : res.status(404).send({message: 'invalid user data'});
        
    } catch (error) {
        console.log(error.message);
       return res.status(500).send({message: 'email is already taken please contact admin'}); 
    }
    
});

route.get('/top-sellers', expressAsyncHandler( async(req, res)=>{
    const topSellers = await User.find({isSeller: true}).sort({'seller.rating':-1}).limit(3);
    return res.status(200).send(topSellers);
}));
route.get('/createadmin', async(req, res) => {
    
    try {
        const user = new User({
            name: 'Janvier',
            email:'Janvier102@example.com',
            password: bcrypt.hashSync('safepassword', 10),
            isAdmin: true
        });
        const newUser = await user.save();
        return res.send(user);
        
    } catch (error) {
        res.send({message: error.message});
    }
});

route.get('/all', async(req, res)=> res.send( await User.find()));

route.get('/admins',async(req, res)=>{
    return res.send({data: await User.find({isAdmin:true})});
});
route.get('/:id/details', isAuth, async(req, res)=> {   
        
        const user = await User.findById(req.params.id);
        console.log(user);
        return user ? res.status(200).send(user):res.status(404).send({message: 'User Not found'}); 
});

route.put('/profile', isAuth, async(req, res)=> {
 
    try {
    const user = await User.findById(req.user._id);
    if(user) {
        user.name = req.body.name;
        user.email = req.body.email;
        if(user.isSeller) {
            user.seller.name = req.body.sellerName || user.seller.name;
            user.seller.logo = req.body.sellerLogo || user.seller.logo;
            user.seller.description = req.body.sellerDescription || user.seller.description;
            
            if(req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);            
            }
        }
         
        
        const updatedUser = await user.save();
        const {_id, name, email, isAdmin,isSeller} = updatedUser;  
        console.log(updatedUser);   
        return res.status(200).send({_id, name, email, isAdmin, isSeller, token:getToken(updatedUser), message:'Profile updated successfully'});
        //return res.status(200).send({updatedUser, token:getToken(updatedUser), message:'Profile updated successfully'});

    }
    } catch (error) {
        return res.send({error: error.message, message: 'internal serve error'})
    }
    
});
route.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res)=> {
    const users = await User.find();
    return users ? res.send(users) : res.send({message:"Users is empty"});
}));
route.delete("/:id/delete", isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    
    const user =await User.findById(req.params.id);
        if(user) {
            if (user.isAdmin){
                return res.status(400).send({message: `Can not Delete Admin`});
            } 
            return res.status(200).send({message: 'User deleted', user: await user.remove()}) ;
        }
        return res.status(404).send({message: 'User not found'});
  
}));

route.put("/:id/edit", isAuth, isAdmin, expressAsyncHandler(async(req, res)=> {
    const user = await User.findOneAndUpdate({_id:req.params.id},req.body);
    if(user) {
        return res.status(200).send({message: 'User is updated', user});
    }
    return res.status(404).send({message: 'User not found'});
}));

export default route;