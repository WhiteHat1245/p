import { CreateInventoryTakeDetailDto } from '../../dto/create-inventory-take-detail.dto';

export class CreateInventoryTakeDetailCommand {
  constructor(public readonly dto: CreateInventoryTakeDetailDto) {}
}