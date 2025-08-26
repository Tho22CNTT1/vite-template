import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
} from 'typeorm';
import { Brand } from './Brand.entity';
import { Category } from './Category.entity';
import {
    IsInt,
    Min,
    Max,
    IsOptional,
    IsString,
    IsNumber,
} from 'class-validator';
import { OrderDetails } from './OrderDetails.entity';
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @IsString()
    @Column({ type: 'varchar', length: 150 })
    name: string;

    @IsOptional()
    @IsString()
    @Column({ type: 'text', nullable: true })
    description?: string;

    @IsNumber()
    @Min(0)
    @Column({ type: 'decimal', precision: 12, scale: 2 })
    price: number;


    @IsNumber()
    @Min(0)
    @Max(70)
    @Column({ type: 'decimal', precision: 18, scale: 2, default: 0 })
    discount: number;

    @IsInt()
    @Min(0)
    @Column({ type: 'smallint', default: 0 })
    stock: number;

    @Column({ type: 'int', nullable: true })
    @IsOptional()
    @IsInt()
    @Min(1900)
    @Max(new Date().getFullYear() + 1)
    modelYear?: number;

    @Column({ type: 'int', nullable: true })
    brandId: number;

    @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'brandId' })
    brand: Brand;

    @Column({ type: 'int', nullable: true })
    categoryId: number;

    @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL', nullable: true })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    updatedAt: Date;

    @OneToMany(() => OrderDetails, (orderDetails) => orderDetails.product)
    orderDetails: OrderDetails[];
}
