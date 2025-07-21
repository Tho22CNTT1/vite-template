import mongoose, { Document, Schema } from 'mongoose';

export interface CustomerDocument extends Document {
    first_name: string;
    last_name: string;
    phone: string;
    email: string;
    street: string;
    city: string;
    state: string;
    zip_code?: string;
    password?: string;
}

const CustomerSchema = new Schema<CustomerDocument>(
    {
        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        phone: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zip_code: { type: String, maxlength: 5 },
        password: { type: String },
    },
    {
        timestamps: true,
    }
);

const Customer = mongoose.model<CustomerDocument>('Customer', CustomerSchema);
export default Customer;
