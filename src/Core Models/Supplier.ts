// في ملف: src/supplier/supplier.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Purchase } from './Purchase ';
import { PurchaseReturn } from './PurchaseReturn';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  SupplierID: number;

  @Column({ length: 100 })
  SupplierName: string;

  @Column({ length: 255, nullable: true })
  ContactInfo: string;

  @OneToMany(() => Purchase, (purchase: Purchase) => purchase.Supplier)
  Purchases: Purchase[];

  @OneToMany(
    () => PurchaseReturn,
    (purchaseReturn: PurchaseReturn) => purchaseReturn.Supplier,
  )
  PurchaseReturns: PurchaseReturn[];
  Debts: any;
}
