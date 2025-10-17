// في ملف: src/sales-return/sales-return.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Sale } from './Sale ';
import { Customer } from './Customer';
import { SalesReturnDetail } from './SalesReturnDetail';

@Entity()
export class SalesReturn {
  @PrimaryGeneratedColumn()
  ReturnID: number;

  @Column()
  SaleID: number;

  @Column()
  CustomerID: number;

  @Column({ type: 'date' })
  ReturnDate: Date;

  @Column({ length: 255 })
  Reason: string;

  @ManyToOne(() => Sale, (sale) => sale.SalesReturns)
  Sale: Sale;

  @ManyToOne(() => Customer, (customer) => customer.SalesReturns)
  Customer: Customer;

  @OneToMany(
    () => SalesReturnDetail,
    (detail: SalesReturnDetail) => detail.SalesReturn,
  )
  SalesReturnDetails: SalesReturnDetail[];
}
