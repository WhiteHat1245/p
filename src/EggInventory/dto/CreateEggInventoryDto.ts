import { IsNumber, IsNotEmpty, IsDateString, IsPositive } from 'class-validator';

export class CreateEggInventoryDto {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  CoopID: number;

  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  Quantity: number;

  @IsDateString()
  @IsNotEmpty()
  InventoryDate: Date;
}
