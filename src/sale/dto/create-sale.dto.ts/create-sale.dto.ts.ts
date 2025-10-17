import {
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SaleDetailDto } from '../sale-detail.dto';

export class CreateSaleDto {
  @IsNumber()
  @IsNotEmpty()
  customerID: number;

  @IsDateString()
  @IsNotEmpty()
  saleDate: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SaleDetailDto)
  saleDetails: SaleDetailDto[];
}
