import categoriesService from '../services/categories.service';
import { sendJsonSuccess } from '../helpers/responsive.helper';
const findAll = async (req, res, next) => {
    try {
        const categories = await categoriesService.findAll();
        sendJsonSuccess(res, categories);
    }
    catch (error) {
        next(error);
    }
};
const findById = async (req, res, next) => {
    try {
        const id = req.params.id; // string
        const category = await categoriesService.findById(id);
        sendJsonSuccess(res, category);
    }
    catch (error) {
        next(error);
    }
};
const create = async (req, res, next) => {
    try {
        const newCategory = await categoriesService.create(req.body);
        sendJsonSuccess(res, newCategory, 'Category created');
    }
    catch (error) {
        next(error);
    }
};
const updateById = async (req, res, next) => {
    try {
        const id = req.params.id; // string
        const updated = await categoriesService.updateById(id, req.body);
        sendJsonSuccess(res, updated);
    }
    catch (error) {
        next(error);
    }
};
const deleteById = async (req, res, next) => {
    try {
        const id = req.params.id; // string
        const deleted = await categoriesService.deleteById(id);
        sendJsonSuccess(res, deleted);
    }
    catch (error) {
        next(error);
    }
};
export default {
    findAll,
    findById,
    create,
    updateById,
    deleteById
};
