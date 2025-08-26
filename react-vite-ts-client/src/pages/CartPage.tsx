import { useCartStepStore } from "@/stores/useCartStepStore";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { useNavigate } from "react-router-dom";
const CartItemsList = () => {
    const { items, removeFromCart, updateQuantity, totalPrice, clearCart } =
        useShoppingCartStore();
    const { setStep } = useCartStepStore();
    const navigate = useNavigate();
    if (items.length === 0) {
        return <p className="text-center text-gray-500">🛒 Giỏ hàng trống</p>;
    }

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div
                    key={item._id}
                    className="flex items-center gap-4 bg-white p-4 rounded-lg shadow"
                >
                    {/* Ảnh sản phẩm */}
                    <img
                        src={item.thumbnail}
                        alt={item.product_name}
                        className="w-20 h-20 object-cover rounded-md border"
                    />

                    {/* Thông tin */}
                    <div className="flex-1">
                        <h3 className="font-semibold">{item.product_name}</h3>
                        <p className="text-sm text-gray-500">
                            Giá: {item.price.toLocaleString()}₫
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                            <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                className="px-2 py-1 bg-gray-200 rounded"
                                onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            >
                                +
                            </button>
                            <button
                                className="ml-4 text-red-500 hover:underline"
                                onClick={() => removeFromCart(item._id)}
                            >
                                Xóa
                            </button>
                            <button onClick={clearCart}>
                                xóa giỏ hàng
                            </button>
                        </div>
                    </div>

                    {/* Thành tiền */}
                    <div className="font-medium text-blue-600">
                        {(item.price * item.quantity).toLocaleString()}₫
                    </div>
                </div>
            ))}

            {/* Tổng tiền */}
            <div className="text-right font-bold text-lg mt-4">
                Tổng cộng: {totalPrice.toLocaleString()}₫
            </div>
            <button
                onClick={() => {
                    setStep(2); // 👉 chuyển sang bước checkout
                    navigate("/cart/checkout");
                }}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
            >
                Thanh toán
            </button>
        </div>
    );
};

export default CartItemsList;
