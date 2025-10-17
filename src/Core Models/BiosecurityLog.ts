// في ملف: src/biosecurity-log/biosecurity-log.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class BiosecurityLog {
  @PrimaryGeneratedColumn()
  LogID: number;

  @Column({ type: 'date' })
  LogDate: Date;

  @Column({ length: 255 })
  Activity: string;

  @Column({ length: 255 })
  Notes: string;

  @Column({ length: 50 })
  PerformedBy: string;
}
