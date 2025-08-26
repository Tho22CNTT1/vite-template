import { useCartStepStore } from "@/stores/useCartStepStore";

const steps = [
    { id: 1, label: "Giỏ hàng" },
    { id: 2, label: "Thanh toán" },
    { id: 3, label: "Hoàn tất" },
];

const CartSteps = () => {
    const { step } = useCartStepStore();

    return (
        <div className="flex items-center justify-center gap-6 my-6">
            {steps.map((s) => (
                <div key={s.id} className="flex items-center gap-2">
                    <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold 
            ${step >= s.id ? "bg-blue-600" : "bg-gray-300"}`}
                    >
                        {s.id}
                    </div>
                    <span className={step >= s.id ? "text-blue-600 font-semibold" : "text-gray-500"}>
                        {s.label}
                    </span>
                    {s.id < steps.length && (
                        <div
                            className={`w-12 h-1 ${step > s.id ? "bg-blue-600" : "bg-gray-300"}`}
                        ></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default CartSteps;
