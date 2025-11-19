import { IsNumber, IsNotEmpty, IsDateString, IsString, Length, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseReturnDetailDto } from './purchase-return-detail.dto';

export class CreatePurchaseReturnDto {
  @IsNumber()
  @IsNotEmpty()
  PurchaseID: number;

  @IsNumber()
  @IsNotEmpty()
  SupplierID: number;

  @IsDateString()
  @IsNotEmpty()
  ReturnDate: Date;

  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  Reason: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PurchaseReturnDetailDto)
  PurchaseReturnDetails: PurchaseReturnDetailDto[];
}