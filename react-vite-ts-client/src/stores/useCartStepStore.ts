
import { create } from "zustand";

interface CartStepState {
    step: number;             // bước hiện tại
    setStep: (step: number) => void; // hàm cập nhật bước
}

export const useCartStepStore = create<CartStepState>((set) => ({
    step: 1, // mặc định là giỏ hàng
    setStep: (step) => set({ step }),
}));
