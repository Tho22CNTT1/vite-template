// src/services/order.service.ts
import { OrderModel, IOrder } from "../models/Order.model";
import { Types } from "mongoose";

export const OrderService = {
    async findAll() {
        return OrderModel.find()
            .populate("customer_id")
            .populate("staff_id")
            .populate("order_details.product_id")
            .exec();
    },

    async findById(id: string) {
        return OrderModel.findById(new Types.ObjectId(id))
            .populate("customer_id")
            .populate("staff_id")
            .populate("order_details.product_id")
            .exec();
    },

    async create(orderData: Partial<IOrder>) {
        const order = new OrderModel(orderData);
        return order.save();
    },

    async updateById(id: string, updateData: Partial<IOrder>) {
        return OrderModel.findByIdAndUpdate(
            new Types.ObjectId(id),
            updateData,
            { new: true }
        )
            .populate("customer_id")
            .populate("staff_id")
            .populate("order_details.product_id")
            .exec();
    },

    async deleteById(id: string) {
        return OrderModel.findByIdAndDelete(new Types.ObjectId(id)).exec();
    },
};
