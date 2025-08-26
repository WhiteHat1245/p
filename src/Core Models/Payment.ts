import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Purchase } from './Purchase ';
import { Supplier } from './Supplier';
import { PaymentMethod } from './PaymentMethod';
@Entity()
export class Payment { 
    @PrimaryGeneratedColumn()
    PaymentID: number;
  
    @Column()
    PurchaseID: number;
  
    @Column({ nullable: true })
    SupplierID: number;
  
    @Column()
    PaymentMethodID: number;
  
    @Column({ type: 'date' })
    PaymentDate: Date;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    Amount: number;
  
    @Column({ length: 255 })
    Description: string;
  
    @ManyToOne(() => Purchase, (purchase) => purchase.Payments)
    Purchase: Purchase;
  
    @ManyToOne(() => Supplier, (supplier) => supplier.Payments)
    Supplier: Supplier;
  
    @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.Payments)
    PaymentMethod: PaymentMethod;
}