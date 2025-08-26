// في ملف: src/sale/sale.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Customer } from '../customer/customer.entity';
import { SaleDetail } from './sale-detail.entity';
import { SalesReturn } from './sales-return.entity';
import { Receipt } from '../receipt/receipt.entity';
import { Debt } from '../debt/debt.entity';

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

  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.Sale)
  SaleDetails: SaleDetail[];

  @OneToMany(() => SalesReturn, (salesReturn) => salesReturn.Sale)
  SalesReturns: SalesReturn[];

  @OneToMany(() => Receipt, (receipt) => receipt.Sale)
  Receipts: Receipt[];

  @OneToMany(() => Debt, (debt) => debt.Sale)
  Debts: Debt[];
}