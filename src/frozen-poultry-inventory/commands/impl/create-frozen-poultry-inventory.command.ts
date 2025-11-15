import { CreateFrozenPoultryInventoryDto } from '../../dto/create-frozen-poultry-inventory.dto';

export class CreateFrozenPoultryInventoryCommand {
  constructor(
    public readonly createFrozenPoultryInventoryDto: CreateFrozenPoultryInventoryDto,
  ) {}
}
