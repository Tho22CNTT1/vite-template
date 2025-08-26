// src/models/Order.model.ts
import { Schema, model, Types, Document } from "mongoose";

export interface IOrderDetail {
    product_id: Types.ObjectId;
    quantity: number;
    price: number;
}

export interface IOrder extends Document {
    customer_id: Types.ObjectId;
    staff_id?: Types.ObjectId;
    order_date: Date;
    require_date?: Date;
    shipping_date?: Date;
    payment_type: number;
    status: number;
    order_details: IOrderDetail[];
    total_price: number;
}

const orderDetailSchema = new Schema<IOrderDetail>({
    product_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
});

const orderSchema = new Schema<IOrder>(
    {
        customer_id: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
        staff_id: { type: Schema.Types.ObjectId, ref: "Staff", required: false },
        order_date: { type: Date, default: Date.now },
        require_date: { type: Date, default: null },
        shipping_date: { type: Date, default: null },
        payment_type: {
            type: Number,
            enum: [1, 2, 3, 4], // 1=COD, 2=Credit, 3=ATM, 4=Cash
            required: true,
        },
        status: {
            type: Number,
            enum: [0, 1, 2, 3, 4], // pending, confirmed, shipping, done, canceled
            default: 0,
        },
        order_details: { type: [orderDetailSchema], required: true },
        total_price: { type: Number, required: true },
    },
    {
        timestamps: true,
    }
);

export const OrderModel = model<IOrder>("Order", orderSchema);
