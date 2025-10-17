import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsDateString,
} from 'class-validator';

export class CreateVaccineDto {
  @IsString()
  @IsNotEmpty()
  vaccineName: string;

  @IsString()
  @IsOptional()
  manufacturer: string;

  @IsDateString()
  @IsOptional()
  expirationDate: Date;
}
