import { Staff } from '../entities/Staff.entity';
import { AppDataSource } from '../data-source';

export const StaffRepository = AppDataSource.getRepository(Staff)