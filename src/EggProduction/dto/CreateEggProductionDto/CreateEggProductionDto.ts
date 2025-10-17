import {
  IsInt,
  IsDateString,
  IsNumber,
  IsNotEmpty,
  IsOptional,
  Min,
  Max,
} from 'class-validator';

export class CreateEggProductionDto {
  @IsInt()
  @IsNotEmpty()
  CoopID: number;

  @IsDateString()
  @IsNotEmpty()
  ProductionDate: Date;

  @IsInt()
  @IsNotEmpty()
  @Min(0)
  NumberOfEggs: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  SpoilageRate?: number;
}
