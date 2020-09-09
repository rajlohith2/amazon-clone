import express, { Router } from "express";
import User from '../models/userModel';

const route =  express.Router();

route.get('/createadmin', async(req, res) => {
    
    try {
        const user = new User({
            name: 'Janvier',
            email:'Janvier1@example.com',
            password: 'safepassword',
            isAdmin: true
        });
        const newUser = await user.save();
        res.send(user);
        
    } catch (error) {
        res.send({msg: error.message});
    }
});
export default route;