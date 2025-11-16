import { IsNumber, IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class CreateInventoryTakeDetailDto {
  @IsNumber()
  @IsNotEmpty()
  InventoryTakeID: number;

  @IsNumber()
  @IsNotEmpty()
  ItemID: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  ItemType: string;

  @IsNumber()
  @IsNotEmpty()
  QuantityCounted: number;
}
