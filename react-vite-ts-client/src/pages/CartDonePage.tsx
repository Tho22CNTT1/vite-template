import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

const CartDonePage = () => {
    const location = useLocation();
    const order = location.state; // lấy order từ navigate

    // ✅ Lấy state từ store
    const { totalItems, orderInfo, clearCart } = useShoppingCartStore((state) => ({
        totalItems: state.totalItems,
        orderInfo: state.orderInfo,
        clearCart: state.clearCart,
    }));

    // Nếu không có order (người dùng tự vào link /cart/done)
    if (!order) {
        return (
            <div className="text-center p-6">
                <p>Không tìm thấy thông tin đơn hàng.</p>
                <Link to="/" className="text-blue-600 underline">
                    Quay lại trang chủ
                </Link>
            </div>
        );
    }

    useEffect(() => {
        clearCart(); // ✅ clear giỏ hàng sau khi hoàn tất
    }, [clearCart]);

    return (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
                🎉 Đặt hàng thành công!
            </h2>
            <p className="mb-4">
                Đơn hàng số{" "}
                <span className="font-bold text-red-500">{order.order_id}</span> đã được
                đặt thành công.
            </p>

            <div className="text-left border rounded p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">Thông tin đơn hàng:</h3>
                <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {totalItems.toLocaleString()}đ
                </p>
                <p>
                    <strong>Phương thức:</strong> {order.payment_method}
                </p>

                <h3 className="font-semibold mt-4 mb-2">Thông tin khách hàng:</h3>
                <p>
                    <strong>Họ tên:</strong> {order.customer_name}
                </p>
                <p>
                    <strong>Điện thoại:</strong> {order.customer_phone}
                </p>
                <p>
                    <strong>Email:</strong> {order.customer_email}
                </p>
                <p>
                    <strong>Địa chỉ:</strong> {order.customer_address}
                </p>
            </div>

            <Link
                to="/"
                className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
                Tiếp tục mua sắm
            </Link>
        </div>
    );
};

export default CartDonePage;
