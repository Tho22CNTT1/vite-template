import { useParams } from 'react-router-dom';
import './App.css';
import { useQuery } from '@tanstack/react-query';
import { getProductsByCategorySlug, type ProductResponse } from '@/services/productService';
import ProductsGrid from '../components/ProductsGrid';

const ProductsPage = () => {
    const { slug } = useParams<{ slug: string }>(); // ✅ destructure slug từ params

    const queryCategorySlug = useQuery<ProductResponse>({
        queryKey: ['products', 'category', slug],
        queryFn: () => getProductsByCategorySlug(slug || ''), // ✅ gọi API
        enabled: !!slug, // ✅ chỉ chạy khi có slug
    });

    return (
        <div>
            <h1>ProductsPage</h1>
            <ProductsGrid products={queryCategorySlug.data?.products || []} />
        </div>
    );
};

export default ProductsPage;
