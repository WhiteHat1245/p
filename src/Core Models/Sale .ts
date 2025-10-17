// في ملف: src/sale/sale.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Customer } from './Customer';
import { SaleDetail } from './sale-detail';
import { SalesReturn } from './SalesReturn';
import { Receipt } from './Receipt';
import { Debt } from './Debt';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  SaleID: number;

  @Column()
  CustomerID: number;

  @Column({ type: 'date' })
  SaleDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TotalAmount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Status: string;

  // العلاقات
  @ManyToOne(() => Customer, (customer) => customer.Sales)
  Customer: Customer;

  @OneToMany(() => SaleDetail, (saleDetail: SaleDetail) => saleDetail.Sale)
  SaleDetails: SaleDetail[];

  @OneToMany(() => SalesReturn, (salesReturn) => salesReturn.Sale)
  SalesReturns: SalesReturn[];

  @OneToMany(() => Receipt, (receipt) => receipt.Sale)
  Receipts: Receipt[];

  @OneToMany(() => Debt, (debt) => debt.Sale)
  Debts: Debt[];
}
