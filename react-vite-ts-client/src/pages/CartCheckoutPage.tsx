// src/pages/CartCheckoutPage.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createOrder, type OrderPayload, type OrderResponse } from "@/services/orderSercices";
import { useCartStore } from "@/stores/cart.store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { useCartStepStore } from "@/stores/useCartStepStore";
// 1️⃣ Interface cho form
interface CheckoutForm {
  last_name: string;
  first_name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  zip_code: string;
  payment: string;
  order_note?: string; // optional
}

interface OrderInfo {
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
  };
  orderId: string;
  paymentType: string;
  items: {
    product_id: string;
    quantity: number;
    price: number;
  }[];
  totalItems: number;
}


// 2️⃣ Schema Yup
const schema: yup.ObjectSchema<CheckoutForm> = yup.object({
  last_name: yup.string().required("Vui lòng nhập họ"),
  first_name: yup.string().required("Vui lòng nhập tên"),
  phone: yup.string().required("Vui lòng nhập số điện thoại"),
  email: yup.string().email("Email không hợp lệ").required("Vui lòng nhập email"),
  street: yup.string().required("Vui lòng nhập địa chỉ"),
  city: yup.string().required("Vui lòng nhập thành phố"),
  state: yup.string().required("Vui lòng nhập tỉnh/thành"),
  zip_code: yup.string().required("Vui lòng nhập zip code"),
  payment: yup.string().required("Vui lòng chọn phương thức thanh toán"),
  order_note: yup.string().optional(),
}) as yup.ObjectSchema<CheckoutForm>;

// 3️⃣ Component
const CartCheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCartStore();
  const { setStep } = useCartStepStore();
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // 🟢 Mutation create order
  const mutationCreateOrder = useMutation<OrderResponse, Error, OrderPayload>({
    mutationFn: createOrder,
    onSuccess: (data, variables) => {
      console.log("✅ Order created successfully:", data);
      setStep(4);
      setOrderInfo({
        customer: {
          first_name: variables.customer_name.split(" ")[0] ?? "",
          last_name: variables.customer_name.split(" ").slice(1).join(" ") ?? "",
          email: data.customer_email,
          phone: data.customer_phone,
          address: data.customer_address,
          city: variables.customer_address.split(",")[1]?.trim() ?? "",
          state: variables.customer_address.split(",")[2]?.trim() ?? "",
          zip_code: variables.customer_address.split(",")[3]?.trim() ?? "",
        },
        orderId: data.order_id,
        paymentType: data.payment_method,
        items: variables.items,
        totalItems: data.total_amount,
      });

      clearCart();
      navigate("/cart/done", { state: { orderInfo: data } });
    },
    onError: (error) => {
      console.error("❌ Lỗi khi tạo order:", error.message);
      alert("Tạo đơn hàng thất bại, vui lòng thử lại!");
    },
  });

  const { mutate, status } = mutationCreateOrder;
  const isLoading = status === "pending";
  // 🟡 Submit handler
  const onSubmit: SubmitHandler<CheckoutForm> = (data) => {
    const payload: OrderPayload = {
      customer_name: `${data.first_name} ${data.last_name}`, // gộp họ + tên
      customer_phone: data.phone,
      customer_email: data.email,
      customer_address: `${data.street}, ${data.city}, ${data.state}, ${data.zip_code}`, // gộp địa chỉ
      payment_method: data.payment,
      items: cartItems.map((item) => ({
        product_id: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      total_amount: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      order_note: data.order_note,
    };

    mutationCreateOrder.mutate(payload);
  };


  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md p-4">
      <input {...register("first_name")} placeholder="Tên" className="border p-2 w-full" />
      {errors.first_name && <p className="text-red-500">{errors.first_name.message}</p>}

      <input {...register("last_name")} placeholder="Họ" className="border p-2 w-full" />
      {errors.last_name && <p className="text-red-500">{errors.last_name.message}</p>}

      <input {...register("phone")} placeholder="Số điện thoại" className="border p-2 w-full" />
      {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

      <input {...register("email")} placeholder="Email" className="border p-2 w-full" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input {...register("street")} placeholder="Địa chỉ" className="border p-2 w-full" />
      {errors.street && <p className="text-red-500">{errors.street.message}</p>}

      <input {...register("city")} placeholder="Thành phố" className="border p-2 w-full" />
      {errors.city && <p className="text-red-500">{errors.city.message}</p>}

      <input {...register("state")} placeholder="Tỉnh/Thành" className="border p-2 w-full" />
      {errors.state && <p className="text-red-500">{errors.state.message}</p>}

      <input {...register("zip_code")} placeholder="Zip Code" className="border p-2 w-full" />
      {errors.zip_code && <p className="text-red-500">{errors.zip_code.message}</p>}

      <select {...register("payment")} className="border p-2 w-full">
        <option value="">-- Chọn phương thức thanh toán --</option>
        <option value="cod">Thanh toán khi nhận hàng (COD)</option>
        <option value="credit_card">Thẻ tín dụng</option>
        <option value="bank_transfer">Chuyển khoản</option>
      </select>
      {errors.payment && <p className="text-red-500">{errors.payment.message}</p>}

      <textarea
        {...register("order_note")}
        placeholder="Ghi chú đơn hàng (tuỳ chọn)"
        className="border p-2 w-full"
      />

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {isLoading ? "Đang xử lý..." : "Thanh toán"}
      </button>

    </form>
  );
};

export default CartCheckoutPage;
