import { IsInt, IsDateString, IsString, IsOptional } from 'class-validator';

export class CreateMortalityDto {
  @IsInt()
  CoopID: number;

  @IsDateString()
  MortalityDate: Date;

  @IsInt()
  NumberOfBirds: number;

  @IsString()
  @IsOptional()
  Cause?: string;
}