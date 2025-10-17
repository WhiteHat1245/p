// في ملف: src/receipt/receipt.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sale } from './Sale ';
import { Customer } from './Customer';
import { PaymentMethod } from './PaymentMethod';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  ReceiptID: number;

  @Column()
  SaleID: number;

  @Column()
  CustomerID: number;

  @Column()
  PaymentMethodID: number;

  @Column({ type: 'date' })
  ReceiptDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: number;

  @ManyToOne(() => Sale, (sale) => sale.Receipts)
  Sale: Sale;

  @ManyToOne(() => Customer, (customer) => customer.Receipts)
  Customer: Customer;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.Receipts)
  PaymentMethod: PaymentMethod;
}
