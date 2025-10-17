// في ملف: src/purchase/purchase.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Supplier } from './Supplier';

import { PurchaseReturn } from './PurchaseReturn';
import { Payment } from './Payment';
import { Debt } from './Debt';
import { PurchaseDetail } from './purchase-detail';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  PurchaseID: number;

  @Column()
  SupplierID: number;

  @Column({ type: 'date' })
  PurchaseDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TotalAmount: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  Status: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TotalCost: number;

  // العلاقات
  @ManyToOne(() => Supplier, (supplier) => supplier.Purchases)
  Supplier: Supplier;

  @OneToMany(
    () => PurchaseDetail,
    (purchaseDetail: PurchaseDetail) => purchaseDetail.Purchase,
  )
  PurchaseDetails: PurchaseDetail[];

  @OneToMany(
    () => PurchaseReturn,
    (purchaseReturn: PurchaseReturn) => purchaseReturn.Purchase,
  )
  PurchaseReturns: PurchaseReturn[];

  @OneToMany(() => Payment, (payment: Payment) => payment.Purchase)
  Payments: Payment[];

  @OneToMany(() => Debt, (debt: Debt) => debt.Purchase)
  Debts: Debt[];
}
