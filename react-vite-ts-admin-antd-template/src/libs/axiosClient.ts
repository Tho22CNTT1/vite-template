import Axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "../stores/useAuthStore";

// ---- Base URL từ env (Vite) ----
const BASE_URL =
  import.meta.env.VITE_BACKEND_URL_API ||
  `${import.meta.env.VITE_BACKEND_URL || "http://localhost:8080"}/api`;

// ---- Khai báo thêm trường _retry cho request config (tránh TS lỗi) ----
declare module "axios" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

// ---- Public client (không token) ----
export const apiClientPublic = Axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

// ---- Private client (gắn token, auto refresh) ----
const apiClient = Axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 20000,
});

// ---- Request: gắn token + xử lý FormData ----
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Token
    const access_token = useAuthStore.getState().user?.access_token;
    if (access_token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${access_token}`;
    }

    // Accept JSON
    config.headers = config.headers || {};
    (config.headers as any).Accept = "application/json";

    // Nếu data là FormData -> xoá Content-Type để browser tự set boundary
    if (config.data instanceof FormData) {
      delete (config.headers as any)["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ---- Refresh token logic ----
const refreshToken = async (): Promise<string | null> => {
  try {
    const refresh_token = useAuthStore.getState().user?.refresh_token;
    if (!refresh_token) return null;

    const res: any = await apiClientPublic.post("/v1/auth/refresh-token", {
      refresh_token,
    });

    const newAccess = res?.data?.data?.accessToken;
    const newRefresh = res?.data?.data?.refreshToken;

    if (!newAccess) return null;

    useAuthStore.getState().updateTokens(newAccess, newRefresh);
    return newAccess;
  } catch (err) {
    console.error("Failed to refresh token:", err);
    useAuthStore.getState().logout();
    // Nếu app SPA: tuỳ bạn có muốn redirect luôn hay chỉ khi call API tiếp theo
    // window.location.href = "/login";
    return null;
  }
};

// ---- Queue để tránh refresh trùng ----
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: string | null) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error);
    else resolve(token);
  });
  failedQueue = [];
};

// ---- Response: auto refresh khi 401/403 ----
apiClient.interceptors.response.use(
  (res) => res.data, // tiện: trả luôn data
  async (error: AxiosError) => {
    const originalRequest: any = error.config || {};

    const status = error.response?.status;
    const url = originalRequest?.url as string | undefined;

    // Không refresh cho các endpoint auth
    if (url && (url.includes("/v1/auth/login") || url.includes("/v1/auth/refresh-token"))) {
      return Promise.reject(error);
    }

    if ((status === 401 || status === 403) && !originalRequest._retry) {
      if (isRefreshing) {
        // Chờ refresh hiện tại hoàn tất
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          if (token) {
            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
          }
          return apiClient(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const newToken = await refreshToken();
        if (!newToken) throw error;

        // Cập nhật header cho request lỗi
        originalRequest.headers = originalRequest.headers || {};
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        processQueue(null, newToken);
        return apiClient(originalRequest);
      } catch (err) {
        processQueue(err, null);
        throw err;
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
