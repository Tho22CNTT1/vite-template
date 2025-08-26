// src/databases/seedStaff.ts
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Staff from '../models/Staff.model';
const MONGO_URI = 'mongodb://127.0.0.1:27017/Batch-193'; // sửa tên database bạn đang dùng
const staffData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        password: '123456',
        active: 1,
        store_id: 1,
        manage_id: null,
    },
    {
        first_name: 'Jane',
        last_name: 'Smith',
        phone: '456-789-0123',
        email: 'jane.smith@example.com',
        password: '123456',
        active: 1,
        store_id: 2,
        manage_id: 1,
    },
    {
        first_name: 'Michael',
        last_name: 'Johnson',
        phone: '789-012-3456',
        email: 'michael.johnson@example.com',
        password: '123456',
        active: 0,
        store_id: 1,
        manage_id: null,
    },
    {
        first_name: 'Emily',
        last_name: 'Brown',
        phone: '012-345-6789',
        email: 'emily.brown@example.com',
        password: '123456',
        active: 1,
        store_id: 3,
        manage_id: 2,
    },
    {
        first_name: 'William',
        last_name: 'Martinez',
        phone: '234-567-8901',
        email: 'william.martinez@example.com',
        password: '123456',
        active: 1,
        store_id: 2,
        manage_id: 1,
    },
];
async function seedStaff() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');
        await Staff.deleteMany();
        console.log('🗑️ Old staffs removed');
        const hashedStaffs = await Promise.all(staffData.map(async (staff) => {
            const hashedPassword = await bcrypt.hash(staff.password, 10);
            return { ...staff, password: hashedPassword };
        }));
        await Staff.insertMany(hashedStaffs);
        console.log('✅ Staff data seeded successfully');
        process.exit(0);
    }
    catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
}
seedStaff();
