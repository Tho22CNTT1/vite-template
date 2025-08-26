import createHttpError from "http-errors";
import { brandRepository } from "../repository/brand.reposity";

const findAll = async () => {
    const brands = await brandRepository.find();
    return []
}