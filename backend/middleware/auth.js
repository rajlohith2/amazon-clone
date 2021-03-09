import jwt from "jsonwebtoken";
import config from "../util/config";

const getToken = (user) => {
    
    try {
         return jwt.sign({
             _id: user._id,
             name: user.name,
             email: user.email,
             isAdmin: user.isAdmin,
             isSeller: user.isSeller
            }, 
            config.JWT_SECRET || `somethingsecret`,   {
            expiresIn: '48h'
        });
        
    } catch (error) {
        return console.log(error.message);
    }  
}
const isAuth = (req, res, next) => {
    const token = req.headers.authorization || req.headers.Authorization;
    if(token) {
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken,
             config.JWT_SECRET || `somethingsecret`, 
             (error, decode)=>{
            if(error) {
                return res.status(401).send({message: 'error in creating token', error: error.message });
            }else {
            req.user = decode;
            return next();
            }
        });
    } else {
        return res.status(401).send({message: 'Token is not supplied'});
    }

}
const isAdmin = (req, res, next) => {    
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(403).send({message: 'Admin is not valid'});
}
const isSeller = (req, res, next) => {    
    if(req.user && req.user.isSeller) {
        return next();
    }
    return res.status(403).send({message: 'Seller is not valid'});
}

const isSellerOrAdmin = (req, res, next) => {    
    if(req.user && (req.user.isAdmin || req.user.isSeller) ) {
        return next();
    }
    return res.status(403).send({message: 'Seller is not valid'});
}
export { getToken, isAuth, isAdmin, isSeller, isSellerOrAdmin } ;
