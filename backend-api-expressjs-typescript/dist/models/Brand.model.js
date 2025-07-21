import mongoose, { Schema } from 'mongoose';
const BrandSchema = new Schema({
    brand_name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true }
}, { timestamps: true });
const Brand = mongoose.model('Brand', BrandSchema);
export default Brand;
