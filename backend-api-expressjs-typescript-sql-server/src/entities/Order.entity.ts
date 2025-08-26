import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from './Customer.entity';
import { Staff } from './Staff.entity';
import { OrderDetails } from './OrderDetails.entity';

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    orderDate: Date;

    @Column({ default: 'pending' })
    status: string;

    @ManyToOne(() => Customer, (customer) => customer.orders)
    customer: Customer;

    @ManyToOne(() => Staff, (staff) => staff.orders)
    staff: Staff;

    @OneToMany(() => OrderDetails, (detail) => detail.order, { cascade: true })
    orderDetails: OrderDetails[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
