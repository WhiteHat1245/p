import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToOne,
  ManyToOne,
} from 'typeorm';
import { SalesReturn } from './SalesReturn';
import { SaleDetail } from './sale-detail';
@Entity()
export class SalesReturnDetail {
  @PrimaryGeneratedColumn()
  SalesReturnDetailID: number;

  @Column()
  SalesReturnID: number;

  @Column()
  SaleDetailID: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  QuantityReturned: number;

  @ManyToOne(() => SalesReturn, (salesReturn) => salesReturn.SalesReturnDetails)
  SalesReturn: SalesReturn;

  @OneToOne(() => SaleDetail)
  @JoinColumn({ name: 'SaleDetailID' })
  SaleDetail: SaleDetail;
}
