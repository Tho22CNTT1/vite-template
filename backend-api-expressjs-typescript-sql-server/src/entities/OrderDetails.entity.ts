import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './Order.entity';
import { Product } from './Product.entity';

@Entity('order_details')
export class OrderDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int')
    quantity: number;

    @Column('decimal', { precision: 10, scale: 2 })
    unitPrice: number;

    @ManyToOne(() => Order, (order) => order.orderDetails)
    order: Order;

    @ManyToOne(() => Product, (product) => product.orderDetails)
    product: Product;
}
