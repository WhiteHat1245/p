
import { IsInt, IsDateString, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  PurchaseID: number;

  @IsInt()
  @IsOptional()
  SupplierID?: number;

  @IsInt()
  PaymentMethodID: number;

  @IsDateString()
  PaymentDate: Date;

  @IsNumber()
  Amount: number;

  @IsString()
  Description: string;
}
