import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateFeedDto {
  @IsString()
  @IsNotEmpty()
  feedName: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsNumber()
  @IsOptional()
  quantity: number;

  @IsString()
  @IsOptional()
  unit: string;
}