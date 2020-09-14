import express from "express";
import User from '../models/userModel';
import getToken  from '../middleware/auth';

const route =  express.Router();

route.post('/signin', async(req, res) => {
    const { email, password } = req.body;
try {
    const signinUser = await User.findOne({
         email,
         password
    });
    //console.log(`Users: ${signinUser}`);

    if(signinUser) {
       return res.status(200).send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser)
        });
    } else {
        res.status(401).send({msg: 'Invalid Email OR Password'});
    } 
    
} catch (error) {
  res.send({error: error.message});  
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
    return res.send({data: await User.updateMany({isAdmin: true})});
})

export default route;