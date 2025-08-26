/* import { Request, Response } from 'express';
//import * as orderService from '../services/orders.service';

const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi lấy đơn hàng', error });
    }
};

const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderService.getOrderById(req.params.id);
        if (!order) return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error });
    }
};

const createOrder = async (req: Request, res: Response) => {
    try {
        const newOrder = await orderService.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: 'Tạo đơn hàng thất bại', error });
    }
};

const deleteOrder = async (req: Request, res: Response) => {
    try {
        await orderService.deleteOrder(req.params.id);
        res.json({ message: 'Đã xoá đơn hàng' });
    } catch (error) {
        res.status(500).json({ message: 'Không thể xoá', error });
    }
};

// ✅ Gom vào object để export mặc định
const orderController = {
    getOrders,
    getOrder,
    createOrder,
    deleteOrder
};

export default orderController;
 */