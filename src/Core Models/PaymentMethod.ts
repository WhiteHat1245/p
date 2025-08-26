// في ملف: src/payment-method/payment-method.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Payment } from './Payment';
import { Receipt } from './Receipt';

@Entity()
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  MethodID: number;

  @Column({ length: 50 })
  MethodName: string;

  @OneToMany(() => Payment, (payment: Payment) => payment.PaymentMethod)
  Payments: Payment[];

  @OneToMany(() => Receipt, (receipt: Receipt) => receipt.PaymentMethod)
  Receipts: Receipt[];
}