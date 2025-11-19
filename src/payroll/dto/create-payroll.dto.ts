
import { IsNumber, IsDateString } from 'class-validator';

export class CreatePayrollDto {
  @IsNumber()
  employeeId: number;

  @IsDateString()
  payPeriodStart: Date;

  @IsDateString()
  payPeriodEnd: Date;

  @IsNumber()
  grossPay: number;

  @IsNumber()
  netPay: number;
}
