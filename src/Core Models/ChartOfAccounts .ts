// في ملف: src/chart-of-accounts/chart-of-accounts.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FinancialTransaction } from '../financial-transaction/financial-transaction.entity';

@Entity()
export class ChartOfAccounts {
  @PrimaryGeneratedColumn()
  AccountID: number;

  @Column({ length: 100 })
  AccountName: string;

  @Column({ length: 50 })
  AccountType: string;

  // علاقات ذاتية المرجعية
  @OneToMany(
    () => FinancialTransaction,
    (transaction) => transaction.DebitAccount,
  )
  DebitTransactions: FinancialTransaction[];

  @OneToMany(
    () => FinancialTransaction,
    (transaction) => transaction.CreditAccount,
  )
  CreditTransactions: FinancialTransaction[];
}
