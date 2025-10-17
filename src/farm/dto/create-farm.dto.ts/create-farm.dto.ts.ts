import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  farmName: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  contactNumber: string;
}
