import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Poultry } from './Poultry';
import { Purchase } from './Purchase ';

@Entity()
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  PurchaseDetailID: number;

  @Column()
  PurchaseID: number;

  @Column()
  ItemID: number;

  @Column()
  Quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  UnitCost: number;

  // العلاقات
  @ManyToOne(() => Purchase, (purchase) => purchase.PurchaseDetails)
  @JoinColumn({ name: 'PurchaseID' })
  Purchase: Purchase;

  @ManyToOne(() => Poultry, (poultry) => poultry.PurchaseDetails)
  @JoinColumn({ name: 'ItemID' })
  Poultry: Poultry;
}
