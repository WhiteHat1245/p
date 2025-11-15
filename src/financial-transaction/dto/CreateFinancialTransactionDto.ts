import { IsDateString, IsNumber, IsNotEmpty, IsString, IsOptional, IsEnum, Min } from 'class-validator';
import { TransactionType } from '../enums/transaction-type.enum';

export class CreateFinancialTransactionDto {
  @IsEnum(TransactionType, { message: 'يجب أن يكون نوع المعاملة إيراد نقدي (CashIn) أو مصروف نقدي (CashOut) أو تحويل (Transfer).' })
  @IsNotEmpty()
  type: TransactionType;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01, { message: 'يجب أن يكون المبلغ أكبر من صفر.' })
  amount: number;

  @IsDateString()
  @IsNotEmpty()
  transactionDate: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  notes?: string;
}
