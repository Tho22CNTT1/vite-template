import dotenv from "dotenv";
import bcrypt from "bcrypt";
import Staff from "../models/Staff.model";
import mongoose from 'mongoose';


dotenv.config();
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/Batch-193';

const seedStaff = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        await Staff.deleteMany({ email: 'tho3@example.com' });
        console.log('🗑️ Deleted old staff');

        const hashedPassword = await bcrypt.hash('123456', 10);

        const newStaff = new Staff({
            first_name: "Tho",
            last_name: "Nguyen",
            fullName: "Tho Nguyen",
            email: "tho3@example.com",
            password: hashedPassword,
            phone: "0900000000",
            store_id: 1, // hoặc ObjectId nếu có store collection
            roles: ["admin"],
            active: true,
        });

        await newStaff.save();
        console.log('✅ New staff seeded');
    } catch (error) {
        console.error('❌ Seeding error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected');
    }
};

seedStaff();
