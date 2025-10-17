import {
  IsInt,
  IsDateString,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsOptional,
  ArrayMinSize,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSalesReturnDto {
  @IsInt()
  @IsNotEmpty()
  SaleID: number;

  @IsInt()
  @IsNotEmpty()
  CustomerID: number;

  @IsDateString()
  @IsNotEmpty()
  ReturnDate: Date;

  @IsString()
  @IsNotEmpty()
  Reason: string;

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSalesReturnDto)
  Details: CreateSalesReturnDto[];
}
