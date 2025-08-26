import { Product } from '../entities/Product.entity';
import { AppDataSource } from '../data-source';

export const ProductRepository = AppDataSource.getRepository(Product)