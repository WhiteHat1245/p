
import { IsNotEmpty, IsNumber, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateGeneralLedgerDto {
  @IsNumber()
  @IsNotEmpty()
  AccountID: number;

  @IsDateString()
  @IsNotEmpty()
  TransactionDate: Date;

  @IsNumber()
  @IsNotEmpty()
  Debit: number;

  @IsNumber()
  @IsNotEmpty()
  Credit: number;

  @IsString()
  @IsNotEmpty()
  Description: string;
}
