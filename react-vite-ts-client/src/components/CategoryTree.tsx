import { getCategoryTree } from "@/services/categoryServices";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const CategoryTree = () => {
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["categories"],
        queryFn: getCategoryTree,
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-6 text-gray-600">
                <span className="animate-spin mr-2">🔄</span> Đang tải danh mục...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="p-4 bg-red-100 text-red-700 rounded-lg">
                Lỗi: {(error as Error).message}
            </div>
        );
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Danh mục sản phẩm
            </h2>
            <ul className="space-y-2">
                {data?.map((category: any) => (
                    <li
                        key={category._id}
                        className="p-3 rounded-lg bg-gray-50 hover:bg-blue-100 transition duration-200 cursor-pointer"
                    >
                        <Link to={`/category/${category.slug}`} className="block text-gray-700 hover:text-blue-600">
                            {category.category_name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryTree;
