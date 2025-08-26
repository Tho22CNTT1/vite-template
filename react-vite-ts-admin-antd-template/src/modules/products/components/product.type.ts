export interface ProductType {
    id: string;
    product_name: string;
    price: number;
    stock: number;
    thumbnail: string;
}

export interface ProductsResponse {
    products: ProductType[];
    limit: number;
    page: number;
    TotalRecord: number;
}

export interface CategoryType {
    id: string;
    category_name: string;
}

export interface BrandType {
    id: string;
    brand_name: string;
}
