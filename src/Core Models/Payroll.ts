import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './Employee ';

@Entity()
export class Payroll {
  @PrimaryGeneratedColumn()
  PayrollID: number;

  @ManyToOne(() => Employee, (employee) => employee.Payrolls)
  Employee: Employee;

  @Column()
  PayPeriodStart: Date;

  @Column()
  PayPeriodEnd: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  GrossPay: number;

  @Column('decimal', { precision: 10, scale: 2 })
  NetPay: number;
}