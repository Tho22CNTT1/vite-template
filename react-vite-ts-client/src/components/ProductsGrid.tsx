import type { Product } from "@/services/productService";
import ButtonAddToCart from "./ButtonAddToCart";
interface ProductsGridProps {
    products: Product[];
}

const ProductsGrid = ({ products }: ProductsGridProps) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {products.map((product) => (
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
                    <ButtonAddToCart product={product} />
                </div>
            ))}
        </div>
    );
};

export default ProductsGrid;
