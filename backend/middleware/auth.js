import jwt from "jsonwebtoken";
import config from "../config";

export const getToken = (user) => {
    
    try {
         return jwt.sign({
             _id: user._id,
             name: user.name,
             email: user.email,
             isAdmin: user.isAdmin
            }, 
            config.JWT_SECRET, 
            {
            expiresIn: '48h'
        }) ;
        
    } catch (error) {
        return console.log(error.message);
    }
    
}
export default getToken;
