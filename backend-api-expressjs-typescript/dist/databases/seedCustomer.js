import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Customer from '../models/Customer.model';
import bcrypt from 'bcrypt';
dotenv.config();
const customers = [
    {
        first_name: 'John',
        last_name: 'Doe',
        phone: '123-456-7890',
        email: 'john.doe@example.com',
        street: '123 Main St',
        city: 'Anytown',
        state: 'CA',
        zip_code: '12345',
    },
    {
        first_name: 'Jane',
        last_name: 'Smith',
        phone: '456-789-0123',
        email: 'jane.smith@example.com',
        street: '456 Elm St',
        city: 'Othertown',
        state: 'NY',
        zip_code: '67890',
    },
    {
        first_name: 'Michael',
        last_name: 'Johnson',
        phone: '789-012-3456',
        email: 'michael.johnson@example.com',
        street: '789 Oak St',
        city: 'Anycity',
        state: 'TX',
        zip_code: '23456',
    },
    {
        first_name: 'Emily',
        last_name: 'Brown',
        phone: '012-345-6789',
        email: 'emily.brown@example.com',
        street: '901 Pine St',
        city: 'Sometown',
        state: 'FL',
        zip_code: '78901',
    },
    {
        first_name: 'William',
        last_name: 'Martinez',
        phone: '234-567-8901',
        email: 'william.martinez@example.com',
        street: '345 Cedar St',
        city: 'Othertown',
        state: 'CA',
        zip_code: '56789',
    },
    {
        first_name: 'Olivia',
        last_name: 'Garcia',
        phone: '567-890-1234',
        email: 'olivia.garcia@example.com',
        street: '678 Maple St',
        city: 'Anycity',
        state: 'NY',
        zip_code: '01234',
    },
    {
        first_name: 'James',
        last_name: 'Lopez',
        phone: '890-123-4567',
        email: 'james.lopez@example.com',
        street: '890 Birch St',
        city: 'Sometown',
        state: 'TX',
        zip_code: '34567',
    },
    {
        first_name: 'Sophia',
        last_name: 'Lee',
        phone: '123-456-7890',
        email: 'sophia.lee@example.com',
        street: '234 Oak St',
        city: 'Othertown',
        state: 'FL',
        zip_code: '89012',
    },
    {
        first_name: 'Benjamin',
        last_name: 'Wang',
        phone: '456-789-0123',
        email: 'benjamin.wang@example.com',
        street: '567 Pine St',
        city: 'Anycity',
        state: 'CA',
        zip_code: '23456',
    },
    {
        first_name: 'Mia',
        last_name: 'Kim',
        phone: '789-012-3456',
        email: 'mia.kim@example.com',
        street: '890 Elm St',
        city: 'Sometown',
        state: 'NY',
        zip_code: '56789',
    },
];
const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const hashCustomers = await Promise.all(customers.map(async (customer) => {
            const hashPassword = await bcrypt.hash('12345', 10);
            return {
                ...customer,
                password: hashPassword,
            };
        }));
        await Customer.deleteMany({});
        await Customer.insertMany(customers, { ordered: false });
        console.log(' Seeded customers successfully');
        process.exit(0);
    }
    catch (err) {
        console.error(' Seed failed:', err);
        process.exit(1);
    }
};
seed();
