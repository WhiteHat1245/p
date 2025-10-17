import {
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PurchaseDetailDto } from '../purchase-detail.dto';

export class CreatePurchaseDto {
  @IsNumber()
  @IsNotEmpty()
  supplierID: number;

  @IsDateString()
  @IsNotEmpty()
  purchaseDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PurchaseDetailDto)
  purchaseDetails: PurchaseDetailDto[];
}
