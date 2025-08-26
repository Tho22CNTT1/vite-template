import axios from "axios";
import { env } from "@/constants/env";

export interface Product {
    _id: string;
    product_name: string;
    slug: string;
    price: number;
    discount: number;
    thumbnail?: string;
    model_year: number
}
export interface ProductResponse {
    products: Product[];
    page: number;
    limit: number;
    totalRecords: number
}
export const getProductHome = async ({
    catId,
    limit = 5,
}: {
    catId?: string;
    limit?: number;
}): Promise<Product[]> => {
    const url = catId
        ? `${env.BACKEND_URL_API}/v1/products/home/${catId}?limit=${limit}`
        : `${env.BACKEND_URL_API}/v1/products/home?limit=${limit}`;

    const response = await axios.get(url);
    return response.data.data;
};

export const getProductsByCategorySlug = async (slug: string): Promise<ProductResponse> => {
    const url = `${env.BACKEND_URL_API}/v1/products/category/${slug}`;
    const response = await axios.get(url);
    return response.data as ProductResponse;
};

export const getProductBySlug = async (slug: string): Promise<Product> => {
    const url = `${env.BACKEND_URL_API}/v1/products/detail/${slug}`;
    const res = await axios.get(url);
    return res.data.data as Product;
};