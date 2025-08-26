import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/services/productService";


const ProductDetailPage = () => {
    const { slug } = useParams<{ slug: string }>();

    const { data: product, isLoading, error } = useQuery({
        queryKey: ['product', slug],
        queryFn: () => getProductBySlug(slug || ''),
        enabled: !!slug
    });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Không thể tải sản phẩm</div>;

    return (
        <div className="container mx-auto py-6">
            {product && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <img src={product.thumbnail} alt={product.product_name} className="w-full rounded" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold mb-4">{product.product_name}</h1>
                        <p className="text-xl text-red-500 mb-2">
                            {product.price?.toLocaleString()}₫
                        </p>
                        <p>Model Year: {product.model_year}</p>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
                            Thêm vào giỏ hàng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailPage;
