// src/entities/Test.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Test {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'nvarchar', length: 100 })
    firstName!: string;

    @Column({ type: 'nvarchar', length: 100 })
    lastName!: string;
}
