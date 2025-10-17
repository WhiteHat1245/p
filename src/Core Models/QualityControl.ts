// في ملف: src/quality-control/quality-control.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class QualityControl {
  @PrimaryGeneratedColumn()
  QualityControlID: number;

  @Column({ type: 'date' })
  TestDate: Date;

  @Column()
  ItemID: number;

  @Column({ length: 50 })
  ItemType: string;

  @Column({ length: 255 })
  Result: string;

  @Column({ type: 'text', nullable: true })
  Notes: string;
}
