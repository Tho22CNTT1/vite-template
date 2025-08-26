
import { create } from "zustand";
import { message } from "antd";

export type msgType = "success" | "error" | "info" | "warning";

interface AppMessageActions {
    msg: string | null;
    type: msgType;
}

interface AppMessageStore {
    msg: string | null;
    type: msgType;
    sendMessage: (data: AppMessageActions) => void;
    clearMessage: () => void;
}

export const useAppMessage = create<AppMessageStore>((set) => ({
    msg: null,
    type: "info",

    sendMessage: ({ msg, type }) => {
        // Hiển thị message bằng Ant Design
        message[type](msg || "");

        // Lưu vào store nếu cần dùng ở component khác
        set({ msg, type });

        // Tự clear sau 3 giây để UI không giữ state thừa
        setTimeout(() => {
            set({ msg: null });
        }, 3000);
    },

    clearMessage: () => set({ msg: null }),
}));
