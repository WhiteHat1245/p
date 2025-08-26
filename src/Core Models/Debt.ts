import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from './Customer';
import { Supplier } from './Supplier';
import { Sale } from './Sale ';
import { Purchase } from './Purchase ';
@Entity()
export class Debt { 
    

    @PrimaryGeneratedColumn()
    DebtID: number;
  
    @Column({ nullable: true })
    CustomerID: number;
  
    @Column({ nullable: true })
    SupplierID: number;
  
    @Column({ nullable: true })
    SaleID: number;
  
    @Column({ nullable: true })
    PurchaseID: number;
  
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    Amount: number;
  
    @Column({ length: 50 })
    Type: string;
  
    @Column({ type: 'date' })
    IssueDate: Date;
  
    @Column({ type: 'date', nullable: true })
    DueDate: Date;
  
    @ManyToOne(() => Customer, (customer) => customer.Debts)
    Customer: Customer;
  
    @ManyToOne(() => Supplier, (supplier) => supplier.Debts)
    Supplier: Supplier;
  
    @ManyToOne(() => Sale, (sale) => sale.Debts)
    Sale: Sale;
  
    @ManyToOne(() => Purchase, (purchase) => purchase.Debts)
    Purchase: Purchase;

}