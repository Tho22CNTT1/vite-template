import { Category } from '../entities/Category.entity';
import { AppDataSource } from '../data-source';

export const categoryRepository = AppDataSource.getRepository(Category)