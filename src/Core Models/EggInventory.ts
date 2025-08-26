// في ملف: src/egg-inventory/egg-inventory.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class EggInventory {
  @PrimaryGeneratedColumn()
  InventoryID: number;

  @Column()
  CoopID: number;

  @Column()
  Quantity: number;

  @Column({ type: 'date' })
  InventoryDate: Date;
}