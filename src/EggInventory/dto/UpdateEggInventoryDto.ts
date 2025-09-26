import { PartialType } from '@nestjs/mapped-types';
import { CreateEggInventoryDto } from './CreateEggInventoryDto';

export class UpdateEggInventoryDto extends PartialType(CreateEggInventoryDto) {}
