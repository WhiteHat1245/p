import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSlaughterhouseDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  licenseNumber: string;

  @IsString()
  @IsOptional()
  status: string;
}
