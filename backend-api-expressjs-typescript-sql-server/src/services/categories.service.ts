import createHttpError from 'http-errors';
import { categoryRepository } from '../repository/category.repository';
export const findAll = async () => {
    const categories = await categoryRepository.find({});
    return categories;
};

export const findById = async (id: number) => {
    const category = await categoryRepository.find({
        where: {
            id
        }
    })
    if (!category) {
        throw createHttpError(400, "categories not found")
    }
    return category;
};

export const create = async (payload: { name: string }) => {
    const category = categoryRepository.create(payload);
    const create = await categoryRepository.save(category)
    return create;
};

export const updateById = async (id: number, payload: ICategoryDTO) => {
    //check tồn tại
    const category = await findById(id)
    // trộn lại với nhau
    Object.assign(category, payload)
    //save
    const result = await categoryRepository.save(category)
    return category;
};

export const deleteById = async (id: number) => {
    const category = await findById(id)
    const result = await categoryRepository.delete(id)
    console.log('result', result)
    return category; // trả về category bị xóa
};

