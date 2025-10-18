// في ملف: src/maintenance-schedule/maintenance-schedule.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Equipment } from './Equipment';

@Entity()
export class MaintenanceSchedule {
  @PrimaryGeneratedColumn()
  ScheduleID: number;

  @Column()
  EquipmentID: number;

  @Column({ type: 'date' })
  ScheduledDate: Date;

  @Column({ length: 255 })
  MaintenanceType: string;

  @Column({ length: 50 })
  Status: string;

  @ManyToOne(() => Equipment, (equipment) => equipment.MaintenanceSchedules)
  Equipment: Equipment;
}
