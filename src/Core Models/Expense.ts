import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity()
export class Expense {
  @PrimaryGeneratedColumn()
  ExpenseID: number;

  @Column()
  EmployeeID: number;

  @Column({ type: 'date' })
  ExpenseDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Amount: number;

  @Column({ length: 255 })
  Description: string;

  @ManyToOne(() => Employee, (employee) => employee.Expenses)
  Employee: Employee;
}
