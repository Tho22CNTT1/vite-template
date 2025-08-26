// src/services/orderService.ts
import apiClient from "@/libs/axiosClient";

// Kiểu dữ liệu cho từng item trong đơn hàng
export interface OrderItem {
    product_id: string;
    quantity: number;
    price: number;
}

// Kiểu dữ liệu payload khi tạo đơn hàng
export interface OrderPayload {
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    customer_address: string;
    payment_method: string;
    items: {
        product_id: string;
        quantity: number;
        price: number;
    }[];
    total_amount: number;
    order_note?: string;
}

// Kiểu dữ liệu phản hồi từ backend
export interface OrderResponse {
    order_id: string;
    customer_name: string;
    customer_phone: string;
    customer_email: string;
    customer_address: string;
    payment_method: string;
    total_amount: number;
    order_note?: string;
    created_at: string;
}


// ---------------- API Service ---------------- //

// Tạo đơn hàng mới
export const createOrder = async (payload: OrderPayload): Promise<OrderResponse> => {
    try {
        const response = await apiClient.post("/v1/orders", payload);
        return response.data;
    } catch (error: any) {
        console.error("❌ Lỗi khi tạo đơn hàng:", error.response?.data || error.message);
        throw error;
    }
};

// Lấy tất cả đơn hàng
export const fetchOrders = async (): Promise<OrderResponse[]> => {
    try {
        const response = await apiClient.get("/v1/orders");
        return response.data;
    } catch (error: any) {
        console.error("❌ Lỗi khi lấy danh sách orders:", error.response?.data || error.message);
        throw error;
    }
};

// Lấy chi tiết 1 đơn hàng
export const fetchOrderById = async (id: string): Promise<OrderResponse> => {
    try {
        const response = await apiClient.get(`/v1/orders/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("❌ Lỗi khi lấy order:", error.response?.data || error.message);
        throw error;
    }
};

// Cập nhật đơn hàng (VD: thay đổi trạng thái)
export const updateOrder = async (id: string, data: Partial<OrderPayload>): Promise<OrderResponse> => {
    try {
        const response = await apiClient.put(`/v1/orders/${id}`, data);
        return response.data;
    } catch (error: any) {
        console.error("❌ Lỗi khi cập nhật order:", error.response?.data || error.message);
        throw error;
    }
};

// Xóa đơn hàng
export const deleteOrder = async (id: string): Promise<{ message: string }> => {
    try {
        const response = await apiClient.delete(`/v1/orders/${id}`);
        return response.data;
    } catch (error: any) {
        console.error("❌ Lỗi khi xóa order:", error.response?.data || error.message);
        throw error;
    }
};
