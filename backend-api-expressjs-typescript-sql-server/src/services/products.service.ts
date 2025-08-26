import createHttpError from "http-errors";
import { ProductRepository } from "../repository/product.repository";
export const findAll = async (query: any) => {
    return await ProductRepository.find();
};

const findById = async (id: string) => {
    return []
}

const create = (payload: any) => {
    return []
}

const updateById = async (id: string, payload: any) => {
    return []
}

const deleteById = async (id: string) => {
    return []
}