import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBreedDto {
  @IsString()
  @IsNotEmpty()
  breedName: string;

  @IsString()
  @IsOptional()
  description: string;
}
