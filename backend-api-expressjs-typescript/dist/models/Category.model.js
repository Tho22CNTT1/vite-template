import mongoose, { Schema } from 'mongoose';
const CategorySchema = new Schema({
    category_name: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true }
}, { timestamps: true });
const Category = mongoose.model('Category', CategorySchema);
export default Category;
