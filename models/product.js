import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    size: { type: String, required: true },
    image: { type: String, required: true },
  
}, { timestamps: true });

// mongoose.model will create db of product
export default mongoose.model('product', productSchema, 'products');