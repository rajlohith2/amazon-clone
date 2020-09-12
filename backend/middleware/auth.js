import jwt from 'jsonwebtoken';
import config from '../config';

const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name:  user.name,
        email: user.email,
        isAdmin: user.isAdmin

    }, config.JWT_SECRET , { expiresIn: '48h'});
}
const isAuth = (req, res, next)=> {
    const token = req.headers.authorization;
    if(token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, config.JWT_SECRET, (error, decoded)=>{
            if(error ) {
               return res.send({msg: 'token not supplied'});
            } else {
              req.user = token;              
              return next();
              
            }
              
        });
    }
    
}
const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    } else {
        return res.status(401).send({msg: 'Token not supplied'});
    }
}
export  {getToken, isAdmin, isAuth};