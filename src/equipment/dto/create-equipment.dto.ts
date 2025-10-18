import { IsString, IsNotEmpty, IsOptional, IsDateString } from 'class-validator';

export class CreateEquipmentDto {
  @IsString()
  @IsNotEmpty()
  Name: string;

  @IsString()
  @IsOptional()
  Description: string;

  @IsDateString()
  PurchaseDate: Date;

  @IsString()
  @IsNotEmpty()
  Status: string;
}