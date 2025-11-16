import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { PurchaseReturn } from './PurchaseReturn';
import { PurchaseDetail } from './purchase-detail';
@Entity()
export class PurchaseReturnDetail {
  @PrimaryGeneratedColumn()
  PurchaseReturnDetailID: number;

  @Column()
  PurchaseReturnID: number;

  @Column()
  PurchaseDetailID: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  QuantityReturned: number;

  @ManyToOne(
    () => PurchaseReturn,
    (purchaseReturn) => purchaseReturn.PurchaseReturnDetails,
  )
  PurchaseReturn: PurchaseReturn;

  @OneToOne(() => PurchaseDetail)
  @JoinColumn({ name: 'PurchaseDetailID' })
  PurchaseDetail: PurchaseDetail;
}
