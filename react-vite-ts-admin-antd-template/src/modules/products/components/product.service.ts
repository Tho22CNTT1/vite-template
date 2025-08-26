// src/modules/products/product.service.ts
import apiClient from "../../../libs/axiosClient";
import type { ProductsResponse } from "./product.type";

// Lấy list (giữ nguyên)
export const fetchProducts = async (
    page: number,
    limit: number,
    search?: string,
    category_id?: string,
    brand_id?: string
): Promise<ProductsResponse> => {
    const params: Record<string, any> = { page, limit };
    if (search) params.search = search;
    if (category_id) params.category_id = category_id;
    if (brand_id) params.brand_id = brand_id;

    const res = await apiClient.get("/products", { params });
    return res.data;
};

export const fetchCategories = async () => {
    const res = await apiClient.get(`/v1/categories`);
    return res.data;
};

export const fetchBrands = async () => {
    const res = await apiClient.get(`/v1/brands`);
    return res.data;
};

export const fetchDelete = async (id: string) => {
    const res = await apiClient.delete(`/v1/products/${id}`);
    return res.data;
};

// ---- CHỈNH Ở ĐÂY: FormData ----

// Thêm sản phẩm (multipart/form-data)
export const fetchCreate = async (formData: FormData) => {
    const res = await apiClient.post(`/v1/products`, formData, {
        // QUAN TRỌNG: để trống Content-Type để trình duyệt tự set boundary
        headers: { "Content-Type": undefined as unknown as string },
    });
    return res.data;
};

// Cập nhật sản phẩm (multipart/form-data)
export const fetchUpdate = async (id: string, formData: FormData) => {
    const res = await apiClient.put(`/v1/products/${id}`, formData, {
        headers: { "Content-Type": undefined as unknown as string },
    });
    return res.data;
};
