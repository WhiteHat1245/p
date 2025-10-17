// في ملف: src/customer/customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Sale } from './Sale ';
import { SalesReturn } from './SalesReturn';
import { Receipt } from './Receipt';
import { Debt } from './Debt';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  CustomerID: number;

  @Column({ length: 100 })
  CustomerName: string;

  @Column({ length: 255, nullable: true })
  ContactInfo: string;

  @OneToMany(() => Debt, (debt) => debt.Customer)
  debts: Debt[];

  @OneToMany(() => Sale, (sale: Sale) => sale.Customer)
  Sales: Sale[];

  @OneToMany(
    () => SalesReturn,
    (salesReturn: SalesReturn) => salesReturn.Customer,
  )
  SalesReturns: SalesReturn[];

  @OneToMany(() => Receipt, (receipt: Receipt) => receipt.Customer)
  Receipts: Receipt[];
}
