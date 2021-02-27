import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    
    name: {type: String, required: true},
    email: {type: String, required:true, unique: true, dropDups: true },
    password: {type: String, required: true },
    isAdmin: {type: Boolean, required: true, default: false},
    isSeller: {type: Boolean, required: true, default: false},
    seller: {
        rating: { type:Number, required: true, default:0 },
        numReviews: { type:Number, required: true, default:0 },
        name:{type: String},
        logo:{type: String},
        description:{type: String}


    }

});
const userModel = mongoose.model("Users", userSchema);

export default userModel;