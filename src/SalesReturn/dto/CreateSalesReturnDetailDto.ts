import { IsInt, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateSalesReturnDetailDto {
  @IsInt()
  @IsNotEmpty()
  SaleDetailID: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  QuantityReturned: number;
}
