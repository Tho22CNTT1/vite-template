

import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 0, min: 0 },
    price: { type: Number, default: 0, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 70 }
});

const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
    order_status: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    order_date: { type: Date, default: Date.now },
    require_date: { type: Date },
    shipping_date: { type: Date },
    staff_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
    order_note: { type: String },
    street: { type: String },
    city: { type: String },
    state: { type: String },
    payment_type: { type: Number, enum: [1, 2, 3, 4], default: 1 },
    order_items: [orderItemSchema] // embedding
});

export const Order = mongoose.model('Order', orderSchema);
