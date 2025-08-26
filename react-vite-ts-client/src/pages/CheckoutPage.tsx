
import { Form, Input, Radio, Button, Card } from "antd";
import { useCartStore } from "@/stores/cart.store";

const CheckoutPage = () => {
    const { items, totalPrice } = useCartStore();

    const onFinish = (values: any) => {
        console.log("Checkout data:", values);
        console.log("Cart items:", items);
    };

    return (
        <div className="grid grid-cols-3 gap-6 p-6">
            {/* Form thông tin khách hàng */}
            <Card title="Checkout" className="col-span-2">
                <Form layout="vertical" onFinish={onFinish}>
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item label="Họ" name="lastName" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Tên" name="firstName" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                        <Form.Item label="Tỉnh/Thành" name="city" rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </div>

                    <Form.Item label="Phương thức thanh toán" name="payment" rules={[{ required: true }]}>
                        <Radio.Group>
                            <Radio value="card">Thẻ tín dụng</Radio>
                            <Radio value="paypal">Paypal</Radio>
                            <Radio value="bank">Chuyển khoản</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item label="Ghi chú" name="note">
                        <Input.TextArea rows={3} />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">Đặt hàng</Button>
                </Form>
            </Card>

            {/* Giỏ hàng */}
            <Card title="Giỏ hàng của bạn">
                {items.map((item) => (
                    <div key={item._id} className="flex justify-between mb-2">
                        <span>{item.product_name} x {item.quantity}</span>
                        <span>{item.price * item.quantity}₫</span>
                    </div>
                ))}
                <hr />
                <div className="flex justify-between font-bold">
                    <span>Tổng cộng:</span>
                    <span>{totalPrice}₫</span>
                </div>
            </Card>
        </div>
    );
};

export default CheckoutPage;
