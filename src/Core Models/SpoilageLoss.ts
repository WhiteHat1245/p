// في ملف: src/spoilage-loss/spoilage-loss.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class SpoilageLoss {
  @PrimaryGeneratedColumn()
  SpoilageLossID: number;

  @Column({ type: 'date' })
  LossDate: Date;

  @Column()
  ItemID: number;

  @Column({ length: 50 })
  ItemType: string;

  @Column()
  QuantityLost: number;
}
