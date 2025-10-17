// في ملف: src/purchase-return/purchase-return.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Purchase } from './Purchase ';
import { Supplier } from './Supplier';
import { PurchaseReturnDetail } from './PurchaseReturnDetail';

@Entity()
export class PurchaseReturn {
  @PrimaryGeneratedColumn()
  ReturnID: number;

  @Column()
  PurchaseID: number;

  @Column()
  SupplierID: number;

  @Column({ type: 'date' })
  ReturnDate: Date;

  @Column({ length: 255 })
  Reason: string;

  @ManyToOne(() => Purchase, (purchase) => purchase.PurchaseReturns)
  Purchase: Purchase;

  @ManyToOne(() => Supplier, (supplier) => supplier.PurchaseReturns)
  Supplier: Supplier;

  @OneToMany(
    () => PurchaseReturnDetail,
    (detail: PurchaseReturnDetail) => detail.PurchaseReturn,
  )
  PurchaseReturnDetails: PurchaseReturnDetail[];
}
