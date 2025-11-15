import { IsNotEmpty, IsNumber, IsDateString, IsOptional } from 'class-validator';

export class CreateFrozenPoultryInventoryDto {
  @IsNotEmpty()
  @IsNumber()
  poultryTypeId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsNotEmpty()
  @IsDateString()
  freezeDate: Date;

  @IsOptional()
  @IsNumber()
  slaughterhouseId?: number;
}
