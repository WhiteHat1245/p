import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
export class CreateCoopDto {
  @IsString()
  @IsNotEmpty()
  coopName: string;

  @IsNumber()
  @IsNotEmpty()
  capacity: number;

  @IsNumber()
  @IsNotEmpty()
  farmId: number;
}
