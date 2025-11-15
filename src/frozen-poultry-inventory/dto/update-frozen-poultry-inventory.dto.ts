import { PartialType } from '@nestjs/mapped-types';
import { CreateFrozenPoultryInventoryDto } from './create-frozen-poultry-inventory.dto';

export class UpdateFrozenPoultryInventoryDto extends PartialType(CreateFrozenPoultryInventoryDto) {}
