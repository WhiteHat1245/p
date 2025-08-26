// في ملف: src/daily-report/daily-report.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class DailyReport {
  @PrimaryGeneratedColumn()
  ReportID: number;

  @Column({ type: 'date' })
  ReportDate: Date;

  @Column({ length: 255 })
  Summary: string;

  @Column({ type: 'text', nullable: true })
  Notes: string;
}