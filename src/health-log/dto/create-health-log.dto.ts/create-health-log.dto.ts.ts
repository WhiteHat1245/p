import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateHealthLogDto {
  @IsNumber()
  @IsNotEmpty()
  poultryID: number;

  @IsDateString()
  @IsNotEmpty()
  logDate: Date;

  @IsString()
  @IsNotEmpty()
  healthStatus: string;

  @IsString()
  @IsOptional()
  notes: string;
}
