import mongoose, { Document, Schema } from 'mongoose';

export interface BrandDocument extends Document {
    brand_name: string;
    description: string;
    slug: string;
}

const BrandSchema = new Schema<BrandDocument>(
    {
        brand_name: { type: String, required: true },
        description: { type: String },
        slug: { type: String, required: true, unique: true }
    },
    { timestamps: true }
);

const Brand = mongoose.model<BrandDocument>('Brand', BrandSchema);
export default Brand;
