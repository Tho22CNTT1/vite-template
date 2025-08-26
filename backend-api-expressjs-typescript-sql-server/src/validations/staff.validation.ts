import * as yup from 'yup';

// ------------------- Common Schema -------------------
const objectIdSchema = yup
    .string()
    .matches(/^[0-9a-fA-F]{24}$/, { message: 'id is non object' })
    .required('id là bắt buộc');

// ------------------- Create -------------------
const createStaff = yup.object({
    first_name: yup.string().min(2).max(50).required('First name is required'),
    last_name: yup.string().min(2).max(50).required('Last name is required'),
    email: yup
        .string()
        .email('Email is not valid')
        .max(160)
        .required('Email is required'),
    password: yup
        .string()
        .min(6, 'Password too short')
        .max(255, 'Password too long')
        .required('Password is required'),
    phone: yup.string().required('Phone is required'),
    store_id: yup.number().required('Store ID is required'),
    active: yup.boolean().optional().default(true),
    roles: yup
        .array()
        .of(yup.string().oneOf(['staff', 'admin', 'superadmin']))
        .default(['staff']),
}).required();

// ------------------- Find By ID -------------------
const findById = yup
    .object({
        params: yup.object({
            id: objectIdSchema,
        }),
    })
    .required();

// ------------------- Delete By ID -------------------
const deleteById = yup
    .object({
        params: yup.object({
            id: objectIdSchema,
        }),
    })
    .required();

// ------------------- Update By ID -------------------
const updateById = yup
    .object({
        params: yup.object({
            id: objectIdSchema,
        }),
        body: yup.object({
            first_name: yup.string().min(2).max(50),
            last_name: yup.string().min(2).max(50),
            email: yup.string().email('Email is not valid').max(160),
            password: yup.string().min(6).max(255),
            phone: yup.string(),
            store_id: yup.number(),
            active: yup.boolean(),
            roles: yup.array().of(yup.string().oneOf(['staff', 'admin', 'superadmin'])),
        }).noUnknown(),
    })
    .required();

// ------------------- Find All (optional query params) -------------------
const findAll = yup
    .object({
        query: yup.object({
            active: yup.boolean().optional(),
            role: yup.string().oneOf(['staff', 'admin', 'superadmin']).optional(),
            store_id: yup.number().optional(),
        }),
    })
    .required();

export default {
    createStaff,
    findById,
    deleteById,
    updateById,
    findAll,
};
