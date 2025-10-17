// في ملف: src/treatment-schedule/treatment-schedule.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Coop } from './Coop';
import { Medication } from './Medication';

@Entity()
export class TreatmentSchedule {
  @PrimaryGeneratedColumn()
  ScheduleID: number;

  @Column()
  CoopID: number;

  @Column()
  MedicationID: number;

  @Column({ type: 'date' })
  ScheduledDate: Date;

  @Column({ length: 50 })
  Status: string;

  @ManyToOne(() => Coop, (coop) => coop.TreatmentSchedules)
  Coop: Coop;

  @ManyToOne(() => Medication, (medication) => medication.TreatmentSchedules)
  Medication: Medication;
}
