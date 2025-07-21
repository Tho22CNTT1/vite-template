import createError from 'http-errors';
import Category from '../models/Category.model';

export interface ICategoryDTO {
    category_name: string;
    description?: string;
    slug?: string;
}

const findAll = async () => {
    return await Category.find();
};

const findById = async (id: string) => {
    const category = await Category.findById(id);
    if (!category) {
        throw createError(404, "Category not found");
    }
    return category;
};

const create = async (payload: ICategoryDTO) => {
    const newCategory = new Category({
        category_name: payload.category_name,
        description: payload.description,
        slug: payload.slug,
    });
    await newCategory.save();
    return newCategory;
};

const updateById = async (id: string, payload: ICategoryDTO) => {
    const category = await findById(id);
    Object.assign(category, payload);
    await category.save();
    return category;
};

const deleteById = async (id: string) => {
    const category = await Category.findByIdAndDelete(id);
    if (!category) throw createError(404, 'Category not found');
    return category;
};

export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
};
