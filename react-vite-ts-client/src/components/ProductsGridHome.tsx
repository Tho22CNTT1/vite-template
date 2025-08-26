import { useQuery } from "@tanstack/react-query";
import type { Product } from "@/services/productService"; // import kiểu type-only
import { getProductHome } from "@/services/productService";
import ProductsGrid from "./ProductsGrid";
interface ProductGridHomeProps {
    title: string;
    linkMore: string;
    catId: string;
    limit?: number;
}

const ProductGridHome = ({
    title,
    linkMore,
    catId,
    limit = 5,
}: ProductGridHomeProps) => {
    const productsHomeQuery = useQuery({
        queryKey: ["productsHome", catId, limit],
        queryFn: () => getProductHome({ catId, limit }),
    });

    if (productsHomeQuery.isLoading) {
        return <div className="text-center py-5">Đang tải...</div>;
    }

    if (productsHomeQuery.isError) {
        return (
            <div className="text-center py-5 text-red-500">
                Lỗi khi tải sản phẩm
            </div>
        );
    }

    const products = productsHomeQuery.data || [];

    return (
        <section className="products-grid my-8">
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold">{title}</h2>
                <a href={linkMore} className="text-blue-600 hover:underline text-sm">
                    Xem tất cả →
                </a>
                <ProductsGrid products={products} />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                {products.map((product: Product) => (
                    <div
                        key={product._id}
                        className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col"
                    >
                        <div className="bg-gray-200 h-32 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                            {product.thumbnail ? (
                                <img
                                    src={product.thumbnail}
                                    alt={product.product_name}
                                    className="object-cover h-full w-full"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No Image</span>
                            )}
                        </div>
                        <h3 className="text-sm font-medium mb-1 line-clamp-2">
                            {product.product_name}
                        </h3>
                        <p className="text-red-500 font-semibold">
                            ₫{" "}
                            {product.price !== undefined
                                ? product.price.toLocaleString()
                                : "0"}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default ProductGridHome;
