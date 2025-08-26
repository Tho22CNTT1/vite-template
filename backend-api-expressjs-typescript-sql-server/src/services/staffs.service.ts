import createHttpError from 'http-errors';
import { StaffRepository } from 'src/repository/staff.repository';

export const findAll = async () => {
    return await StaffRepository.find();
};

export const findById = async (id: number) => {
    const staff = await StaffRepository.findOne({ where: { id } });
    if (!staff) throw createHttpError(400, 'Staff not found');
    return staff;
};

export const create = async (payload: any) => {
    const staff = StaffRepository.create(payload);
    return await StaffRepository.save(staff);
};

export const updateById = async (id: number, payload: any) => {
    const staff = await findById(id);
    Object.assign(staff, payload);
    return await StaffRepository.save(staff);
};

export const deleteById = async (id: number) => {
    const staff = await findById(id);
    await StaffRepository.delete(id);
    return staff;
};
