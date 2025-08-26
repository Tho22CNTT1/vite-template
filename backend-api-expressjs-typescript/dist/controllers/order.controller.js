import { OrderService } from "../services/orders.service";
export const OrderController = {
    async getAll(req, res, next) {
        try {
            const orders = await OrderService.findAll();
            res.json({ success: true, data: orders });
        }
        catch (err) {
            next(err);
        }
    },
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const order = await OrderService.findById(id);
            if (!order)
                return res.status(404).json({ success: false, message: "Order not found" });
            res.json({ success: true, data: order });
        }
        catch (err) {
            next(err);
        }
    },
    async create(req, res, next) {
        try {
            const order = await OrderService.create(req.body);
            //send mail
            res.status(201).json({ success: true, data: order });
        }
        catch (err) {
            next(err);
        }
    },
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const order = await OrderService.updateById(id, req.body);
            if (!order)
                return res.status(404).json({ success: false, message: "Order not found" });
            res.json({ success: true, data: order });
        }
        catch (err) {
            next(err);
        }
    },
    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const deleted = await OrderService.deleteById(id);
            if (!deleted)
                return res.status(404).json({ success: false, message: "Order not found" });
            res.json({ success: true, message: "Order deleted" });
        }
        catch (err) {
            next(err);
        }
    },
};
