import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmDto } from '../create-farm.dto.ts/create-farm.dto.ts';

export class UpdateFarmDto extends PartialType(CreateFarmDto) {}
