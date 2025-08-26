import createHttpError from "http-errors";
import Product from "../models/Product.model";
import Category from "../models/Category.model"; // Thêm dòng này để dùng model Category
export const findHomeProducts = async ({ catId, limit, }) => {
    try {
        const where = {};
        if (catId) {
            where.category_id = catId;
        }
        const products = await Product.find(where)
            .select("-createdAt -updatedAt -description")
            .limit(limit || 10)
            .sort({ createdAt: -1 })
            .populate("category_id", "category_name")
            .populate("brand_id", "brand_name");
        return products;
    }
    catch (err) {
        throw createHttpError(500, "Lỗi khi lấy danh sách sản phẩm trang chủ");
    }
};
export const findAll = async (query) => {
    const page = parseInt(query.page) || 1;
    const keyword = query.keyword || null; // keyword là string, không parseInt
    const limit = parseInt(query.limit) || 5;
    const cat_id = query.cat_id || null;
    const brand_id = query.brand_id || null;
    const skip = (page - 1) * limit;
    const where = {};
    if (keyword) {
        where.product_name = { $regex: keyword, $options: "i" };
    }
    if (cat_id) {
        where.category_id = cat_id;
    }
    if (brand_id) {
        where.brand_id = brand_id;
    }
    const products = await Product.find(where)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate("category_id", "category_name")
        .populate("brand_id", "brand_name");
    const finalProduct = products.filter(product => product.category_id !== null);
    return {
        products,
        page,
        limit,
        totalRecord: await Product.countDocuments(where),
    };
};
export const getProductsByCategorySlug = async (slug, query) => {
    const { keyword, brand_id, page = 1, limit = 10 } = query;
    const where = {};
    // Lấy category theo slug
    const categoryDoc = await Category.findOne({ slug });
    if (!categoryDoc) {
        return [];
    }
    where.category_id = categoryDoc._id;
    if (keyword) {
        where.product_name = { $regex: keyword, $options: "i" };
    }
    if (brand_id) {
        where.brand_id = brand_id;
    }
    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(where, {
        createdAt: 0,
        updatedAt: 0,
        description: 0,
    })
        .skip(skip)
        .limit(Number(limit));
    return products;
};
