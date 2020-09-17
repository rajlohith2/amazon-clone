import express from "express";
import User from '../models/userModel';
import getToken  from '../middleware/auth';

const route =  express.Router();

route.post('/signin', async(req, res) => {
   
   try {
        const { email, password } = req.body;        
        const userLogin = await User.findOne({ email, password });

        if(!userLogin) {
            return res.status(404).send({ msg: 'User not found' });  
        } else {
            
            return res.status(200).send({ 
                _id: userLogin._id,
                name: userLogin.name,
                email: userLogin.email,
                isAdmin: userLogin.isAdmin,
                token:getToken(userLogin)
            });
        }
   } catch (error) {
        return res.status(500).send({
            msg: error.message
        });
   }     


});
route.post('/register', async (req, res)=>{
    try {
    const {name, email, password} = req.body;
    const user = new User({
        name,
        email,
        password
    });
    const newUser = await user.save();
    if(newUser) {
        return res.send({
            user: newUser,
            token: getToken(user)
        }); 
    } else {
        return res.send({msg: 'invalid user data '});
    }
        
    } catch (error) {
       return res.send({msg: error.message}); 
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
    return res.send({data: await User.find({isAdmin: true})});
})

export default route;