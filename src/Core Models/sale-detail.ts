import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Poultry } from './Poultry';
import { Sale } from './Sale ';


@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn()
  SaleDetailID: number;

  @Column()
  SaleID: number;

  @Column()
  ItemID: number;

  @Column()
  Quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  UnitPrice: number;

  // العلاقات
  @ManyToOne(() => Sale, (sale) => sale.SaleDetails)
  @JoinColumn({ name: 'SaleID' })
  Sale: Sale;

  @ManyToOne(() => Poultry, (poultry) => poultry.PurchaseDetails)
  @JoinColumn({ name: 'ItemID' })
  Poultry: Poultry;
}