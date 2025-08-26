import { IsString, IsNotEmpty, IsEmail, IsOptional } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  contactNumber: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;
}