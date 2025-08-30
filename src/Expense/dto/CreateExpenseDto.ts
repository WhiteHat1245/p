import { IsDateString, IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateExpenseDto {
  @IsDateString()
  @IsNotEmpty()
  expenseDate: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}
