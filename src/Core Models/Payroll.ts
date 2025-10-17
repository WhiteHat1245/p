import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './Employee ';
@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  PayrollID: number;

  @Column()
  EmployeeID: number;

  @Column({ type: 'date' })
  PayDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  GrossSalary: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Deductions: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  NetSalary: number;

  @ManyToOne(() => Employee, (employee) => employee.Payrolls)
  Employee: Employee;
}
