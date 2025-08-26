// في ملف: src/health-log/health-log.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Poultry } from './Poultry';

@Entity()
export class HealthLog {
  @PrimaryGeneratedColumn()
  LogID: number;

  @Column()
  PoultryID: number;

  @Column({ type: 'date' })
  LogDate: Date;

  @Column({ length: 255 })
  Condition: string;

  @Column({ type: 'text', nullable: true })
  Notes: string | null;

  @Column({ type: 'text', nullable: true })
  Treatment: string | null;

  @ManyToOne(() => Poultry, (poultry) => poultry.HealthLogs)
  Poultry: Poultry;
}