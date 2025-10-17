import { PartialType } from '@nestjs/mapped-types';
import { CreateBreedDto } from '../create-breed.dto.ts/create-breed.dto.ts';

export class UpdateBreedDto extends PartialType(CreateBreedDto) {}
