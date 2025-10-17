// في ملف: src/general-ledger/general-ledger.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class GeneralLedger {
  @PrimaryGeneratedColumn()
  LedgerID: number;

  @Column()
  AccountID: number;

  @Column({ type: 'date' })
  TransactionDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Debit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  Credit: number;

  @Column({ length: 255 })
  Description: string;
}
