import mongoose, { Schema } from 'mongoose';
const ProductSchema = new Schema({
    product_name: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category_id: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    brand_id: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    description: { type: String },
    model_year: { type: Number },
    stock: { type: Number, default: 0 },
    thumbnail: { type: String },
    slug: { type: String, required: true, unique: true }
}, { timestamps: true });
const Product = mongoose.model('Product', ProductSchema);
export default Product;
