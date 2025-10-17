// في ملف: src/attendance/attendance.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './Employee ';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  AttendanceID: number;

  @Column()
  EmployeeID: number;

  @Column({ type: 'date' })
  AttendanceDate: Date;

  @Column({ type: 'timestamp', nullable: true })
  TimeIn: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  TimeOut: Date | null;

  @ManyToOne(() => Employee, (employee) => employee.Attendance)
  Employee: Employee;
}
