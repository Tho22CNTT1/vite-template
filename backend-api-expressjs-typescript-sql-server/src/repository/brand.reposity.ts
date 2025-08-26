import { Brand } from "../entities/Brand.entity";
import { AppDataSource } from '../data-source';

export const brandRepository = AppDataSource.getRepository(Brand)