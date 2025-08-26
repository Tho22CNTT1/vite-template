/* import bcrypt from 'bcrypt';
import { AppDataSource } from './data-source';
import { Staff } from './entities/Staff.entity';

const seed = async () => {
  await AppDataSource.initialize();
  const staffRepo = AppDataSource.getRepository(Staff);

  const existing = await staffRepo.findOneBy({ email: 'tho3@example.com' });
  if (existing) return console.log('User already exists');

  const staff = staffRepo.create({
    email: 'tho3@example.com',
    password: await bcrypt.hash('12345678', 10),
    fullName: 'Thọ Test',
  });
  await staffRepo.save(staff);
  console.log('✅ Seeded staff');
};

seed();
 */