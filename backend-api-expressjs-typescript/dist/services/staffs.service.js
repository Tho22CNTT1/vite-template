import Staff from '../models/Staff.model';
import createHttpError from 'http-errors';
export const create = async (payload) => {
    const newStaff = new Staff({
        first_name: payload.first_name,
        last_name: payload.last_name,
        email: payload.email,
        phone: payload.phone,
        store_id: payload.store_id,
        manage_id: payload.manage_id,
        active: payload.active,
        password: payload.password,
    });
    await newStaff.save();
    return newStaff.toObject(); // đã remove password nếu schema có transform
};
export const updateById = async (id, payload) => {
    const staff = await Staff.findById(id);
    if (!staff) {
        throw createHttpError(404, 'Staff not found');
    }
    // Cập nhật các trường từ payload
    staff.first_name = payload.first_name ?? staff.first_name;
    staff.last_name = payload.last_name ?? staff.last_name;
    staff.phone = payload.phone ?? staff.phone;
    staff.email = payload.email ?? staff.email;
    staff.active = payload.active ?? staff.active;
    staff.store_id = payload.store_id ?? staff.store_id;
    staff.manage_id = payload.manage_id ?? staff.manage_id;
    await staff.save();
    return staff.toObject();
};
export const findAll = async ({ page = 1, limit = 5 }) => {
    const skip = (page - 1) * limit;
    const staffs = await Staff.find().skip(skip).limit(limit);
    const total = await Staff.countDocuments();
    return {
        data: staffs,
        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
export const findById = async (id) => {
    return await Staff.findById(id);
};
export const deleteById = async (id) => {
    return await Staff.findByIdAndDelete(id);
};
