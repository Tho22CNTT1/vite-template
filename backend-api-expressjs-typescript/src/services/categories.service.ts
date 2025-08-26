import Category from '../models/Category.model';
import createHttpError from 'http-errors';
export const getCategoryTree = async () => {
    const category = await Category
        .find()
        .select("_id category_name slug")
    return category;
}
export const findAll = async () => {
    return await Category.find();
};

export const findById = async (id: string) => {
    const category = await Category.findById(id);
    if (!category) throw createHttpError(404, 'Category not found');
    return category;
};

export const create = async (data: { name: string }) => {
    const exists = await Category.findOne({ name: data.name });
    if (exists) throw createHttpError(400, 'Category already exists');
    return await new Category(data).save();
};

export const updateById = async (id: string, data: { name: string }) => {
    const updated = await Category.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!updated) throw createHttpError(404, 'Category not found');
    return updated;
};

export const deleteById = async (id: string) => {
    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) throw createHttpError(404, 'Category not found');
    return deleted;
};
