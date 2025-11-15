import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFrozenPoultryInventoryCommand } from '../impl/create-frozen-poultry-inventory.command';
import { FrozenPoultryInventory } from '../../../Core Models/FrozenPoultryInventory';

@CommandHandler(CreateFrozenPoultryInventoryCommand)
export class CreateFrozenPoultryInventoryHandler
  implements ICommandHandler<CreateFrozenPoultryInventoryCommand>
{
  constructor(
    @InjectRepository(FrozenPoultryInventory)
    private readonly inventoryRepository: Repository<FrozenPoultryInventory>,
  ) {}

  async execute(command: CreateFrozenPoultryInventoryCommand) {
    const { createFrozenPoultryInventoryDto } = command;
    const inventory = this.inventoryRepository.create(createFrozenPoultryInventoryDto as any);
    return this.inventoryRepository.save(inventory);
  }
}
