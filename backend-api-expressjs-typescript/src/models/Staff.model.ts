
import mongoose from 'mongoose';

const staffSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Number, default: 0 },
    store_id: { type: Number, required: true },
    manage_id: { type: Number },
});

export default mongoose.model('Staff', staffSchema);
