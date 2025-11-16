import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMedicationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsNotEmpty()
  dosage: string;

  @IsString()
  @IsOptional()
  usage_instructions: string;
}
