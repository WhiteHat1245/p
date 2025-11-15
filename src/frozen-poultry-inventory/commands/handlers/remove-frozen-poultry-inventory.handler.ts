import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveFrozenPoultryInventoryCommand } from '../impl/remove-frozen-poultry-inventory.command';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';

@CommandHandler(RemoveFrozenPoultryInventoryCommand)
export class RemoveFrozenPoultryInventoryHandler implements ICommandHandler<RemoveFrozenPoultryInventoryCommand> {
  constructor(
    @InjectRepository(FrozenPoultryInventory)
    private readonly repository: Repository<FrozenPoultryInventory>,
  ) {}

  async execute(command: RemoveFrozenPoultryInventoryCommand): Promise<void> {
    const { id } = command;

    const inventory = await this.repository.findOne({ where: { InventoryID: Number(id) } });

    if (!inventory) {
      throw new NotFoundException(`FrozenPoultryInventory with ID ${id} not found.`);
    }

    await this.repository.delete(id);
  }
}
