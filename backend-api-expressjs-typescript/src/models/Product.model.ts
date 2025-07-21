import mongoose, { Document, Schema } from 'mongoose';

export interface ProductDocument extends Document {
    product_name: string;
    price: number;
    discount: number;
    category_id: mongoose.Types.ObjectId;
    brand_id: mongoose.Types.ObjectId;
    description: string;
    model_year: number;
    stock: number;
    thumbnail: string;
    slug: string;
}

const ProductSchema = new Schema<ProductDocument>(
    {
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
    },
    { timestamps: true }
);

const Product = mongoose.model<ProductDocument>('Product', ProductSchema);
export default Product;
