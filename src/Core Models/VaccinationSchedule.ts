import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Medication } from './Medication';

@Entity()
export class VaccinationSchedule {
  @PrimaryGeneratedColumn()
  ScheduleID: number;

  @Column()
  MedicationID: number;

  @Column({ type: 'date' })
  ScheduledDate: Date;

  @Column({ length: 50 })
  Status: string;

  @ManyToOne(() => Medication, (medication) => medication.VaccinationSchedules)
  Medication: Medication;
}