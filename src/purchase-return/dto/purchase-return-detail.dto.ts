import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class PurchaseReturnDetailDto {
  @IsNumber()
  @IsNotEmpty()
  PurchaseDetailID: number;

  @IsNumber()
  @Min(0.01)
  QuantityReturned: number;
}