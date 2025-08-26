import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
} from 'typeorm';
import { Product } from './Product.entity';
import { Length, validateOrReject } from 'class-validator';
import createError from 'http-errors';
@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Length(3, 50)
    @Column({ type: 'varchar', length: 100 })
    name: string;

    @Length(10, 500)
    @Column({ type: 'text', nullable: true })
    description?: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', default: () => 'GETDATE()' })
    updatedAt: Date;

    @OneToMany(() => Product, (product) => product.category)
    products: Product[];

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        try {
            await validateOrReject(this);
        } catch (errors: any) {
            const messages = errors.map((err: any) =>
                Object.values(err.constraints).join(', ')
            ).join('; ');

            throw createError(400, messages);
        }
    }
}