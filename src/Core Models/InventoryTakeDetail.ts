// في ملف: src/inventory-take-detail/inventory-take-detail.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class InventoryTakeDetail {
  @PrimaryGeneratedColumn()
  DetailID: number;

  @Column()
  InventoryTakeID: number;

  @Column()
  ItemID: number;

  @Column({ length: 50 })
  ItemType: string;

  @Column()
  QuantityCounted: number;
}