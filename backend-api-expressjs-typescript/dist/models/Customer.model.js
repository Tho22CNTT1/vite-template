import mongoose, { Schema } from 'mongoose';
const CustomerSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip_code: { type: String, maxlength: 5 },
    password: { type: String },
}, {
    timestamps: true,
});
const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;
