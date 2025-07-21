import mongoose, { Document, Schema } from 'mongoose';

export interface CategoryDocument extends Document {
    category_name: string;
    description: string;
    slug: string;
}

const CategorySchema = new Schema<CategoryDocument>(
    {
        category_name: { type: String, required: true },
        description: { type: String },
        slug: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

const Category = mongoose.model<CategoryDocument>('Category', CategorySchema);
export default Category;
