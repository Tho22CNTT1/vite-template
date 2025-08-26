// src/components/ui/ButtonAddToCart.tsx
import { Button } from "@/components/ui/button";
import { useShoppingCartStore } from "@/stores/useShoppingCartStore";
import { toast } from "sonner";
import type { Product } from "@/services/productService";

interface ButtonAddToCartProps {
    product: Product;
}

const ButtonAddToCart = ({ product }: ButtonAddToCartProps) => {
    const addToCart = useShoppingCartStore((state) => state.addToCart);

    const handleAddToCart = () => {
        addToCart(product, 1);
        toast.success("Item added to cart 🛒");
    };

    return (
        <Button
            onClick={handleAddToCart}
            variant="default"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
            Add to cart
        </Button>
    );
};

export default ButtonAddToCart;
