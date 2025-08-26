import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm';
import { Product } from './Product.entity';

@Entity('brands')
export class Brand {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    updatedAt: Date;

    // ✅ Quan hệ với Product
    @OneToMany(() => Product, (product) => product.brand)
    products: Product[];
}
