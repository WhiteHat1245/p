// في ملف: src/purchase/purchase.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Supplier } from '../supplier/supplier.entity';
import { PurchaseDetail } from './purchase-detail.entity';
import { PurchaseReturn } from './purchase-return.entity';
import { Payment } from '../payment/payment.entity';
import { Debt } from '../debt/debt.entity';

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

  // العلاقات
  @ManyToOne(() => Supplier, (supplier) => supplier.Purchases)
  Supplier: Supplier;

  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.Purchase)
  PurchaseDetails: PurchaseDetail[];

  @OneToMany(() => PurchaseReturn, (purchaseReturn) => purchaseReturn.Purchase)
  PurchaseReturns: PurchaseReturn[];

  @OneToMany(() => Payment, (payment) => payment.Purchase)
  Payments: Payment[];

  @OneToMany(() => Debt, (debt) => debt.Purchase)
  Debts: Debt[];
}