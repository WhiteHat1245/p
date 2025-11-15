import { UpdateFrozenPoultryInventoryDto } from '../../dto/update-frozen-poultry-inventory.dto';

export class UpdateFrozenPoultryInventoryCommand {
  constructor(
    public readonly id: number,
    public readonly updateFrozenPoultryInventoryDto: UpdateFrozenPoultryInventoryDto,
  ) {}
}
