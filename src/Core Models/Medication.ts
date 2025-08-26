// في ملف: src/medication/medication.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TreatmentSchedule } from './TreatmentSchedule';
import { VaccinationSchedule } from './VaccinationSchedule';

@Entity()
export class Medication {
  @PrimaryGeneratedColumn()
  MedicationID: number;

  @Column({ length: 100 })
  MedicationName: string;

  @Column({ length: 255 })
  Description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  QuantityInStock: number;

  @Column({ length: 50 })
  Unit: string;

  @OneToMany(() => TreatmentSchedule, (schedule) => schedule.Medication)
  TreatmentSchedules: TreatmentSchedule[];

  @OneToMany(() => VaccinationSchedule, (schedule) => schedule.Medication)
  VaccinationSchedules: VaccinationSchedule[];
}