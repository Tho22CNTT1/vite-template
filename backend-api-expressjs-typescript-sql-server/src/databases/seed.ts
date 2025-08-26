import 'reflect-metadata';
import { AppDataSource } from '../data-source';
import { faker } from '@faker-js/faker';
import { Brand } from '../entities/Brand.entity';
import { Category } from '../entities/Category.entity';
import { Product } from '../entities/Product.entity';

export const seedFakeData = async () => {
  await AppDataSource.initialize();
  console.log('📦 Connected to DB');

  const brandRepo = AppDataSource.getRepository(Brand);
  const categoryRepo = AppDataSource.getRepository(Category);
  const productRepo = AppDataSource.getRepository(Product);

  // --- Seed 5 brands ---
  for (let i = 1; i <= 5; i++) {
    const brand = brandRepo.create({
      name: faker.company.name() + ' ' + i,
      description: faker.company.catchPhrase(),
    });
    await brandRepo.save(brand);
    console.log(`✅ Brand ${i} created`);
  }

  // --- Seed 5 categories ---
  for (let i = 1; i <= 5; i++) {
    const category = categoryRepo.create({
      name: faker.commerce.department() + ' ' + i,
      description: faker.lorem.words(10),
    });
    await categoryRepo.save(category);
    console.log(`✅ Category ${i} created`);
  }

  const brands = await brandRepo.find();
  const categories = await categoryRepo.find();

  // --- Seed 15 products ---
  for (let i = 1; i <= 15; i++) {
    const product = productRepo.create({
      name: faker.commerce.productName() + ' ' + i,
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price({ min: 100, max: 2000 })),
      discount: faker.number.float({ min: 0, max: 70, fractionDigits: 2 }),
      stock: faker.number.int({ min: 1, max: 200 }),
      brand: faker.helpers.arrayElement(brands),
      category: faker.helpers.arrayElement(categories),
    });
    await productRepo.save(product);
    console.log(`✅ Product ${i} created`);
  }

  console.log('🎉 Seeding done!');
  process.exit();
};

seedFakeData().catch((err) => {
  console.error('❌ Error seeding data:', err);
  process.exit(1);
});
