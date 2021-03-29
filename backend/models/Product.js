import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: {type:String, required: true},
    comment: {type:String, required:true},
    rating: {type:Number, required:true}
}, 
{
    timestamps: true
});

const ProductSchema = new mongoose.Schema({
    name:{ type: String, required: true, unique: true },
    image:{ type: String, required: true },
    seller:{ type:mongoose.Schema.Types.ObjectId, ref:'Users'},
    brand:{ type: String, required: true },
    price: { type: Number, required: true, default: 0},
    category:{ type: String, required: true },
    countInStock:{ type: Number, default: 0, required: true },
    description:{ type: String, required: true },
    rating:{ type: Number, default: 0, required: true },
    reviews: [reviewSchema],
    numReviews:{ type: Number, default: 0, required: true },
});
const ProductModel = mongoose.model("products", ProductSchema);

export default ProductModel;