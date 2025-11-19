import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreatePoultryBatchDto {
  @IsString()
  @IsNotEmpty()
  batchName: string;

  @IsInt()
  @IsNotEmpty()
  breedId: number;

  @IsInt()
  @IsNotEmpty()
  coopId: number;

  @IsInt()
  @IsNotEmpty()
  chickCount: number;

  @IsDateString()
  @IsNotEmpty()
  arrivalDate: Date;

  @IsString()
  @IsOptional()
  description: string;
}