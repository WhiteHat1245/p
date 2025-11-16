import { PartialType } from '@nestjs/mapped-types';
import { CreateInventoryTakeDetailDto } from './create-inventory-take-detail.dto';

export class UpdateInventoryTakeDetailDto extends PartialType(CreateInventoryTakeDetailDto) {}