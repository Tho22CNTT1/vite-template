import CategoryTree from '@/components/CategoryTree';
import './App.css';

const HomePage = () => {
    return (
        <main className="home-page container mx-auto my-6 px-4">
            {/* Section 1: Category Tree + Banner */}
            <section className="section-category-banner grid grid-cols-1 md:grid-cols-[220px_1fr] gap-5">
                {/* Category Tree */}
                <aside className="categories-tree bg-white rounded-lg shadow p-4">
                    <h2 className="text-lg font-semibold mb-3 border-b pb-2">
                        Danh mục
                    </h2>
                    <CategoryTree />
                </aside>

                {/* Banner */}
                <div className="home-banner bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow flex items-center justify-center text-white text-2xl font-bold">
                    Banner Quảng Cáo
                </div>
            </section>

            {/* Section 2: Product Grid */}
            <section className="products-grid my-8">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-semibold">Sản phẩm nổi bật</h2>
                    <a href="/products" className="text-blue-600 hover:underline text-sm">
                        Xem tất cả →
                    </a>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="bg-white rounded-lg shadow hover:shadow-lg transition p-3 flex flex-col"
                        >
                            <div className="bg-gray-200 h-32 rounded-lg mb-3"></div>
                            <h3 className="text-sm font-medium mb-1">
                                Tên sản phẩm {idx + 1}
                            </h3>
                            <p className="text-red-500 font-semibold">₫ 250.000</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default HomePage;
