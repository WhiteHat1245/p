import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateFrozenPoultryInventoryCommand } from '../impl/update-frozen-poultry-inventory.command';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';

@CommandHandler(UpdateFrozenPoultryInventoryCommand)
export class UpdateFrozenPoultryInventoryHandler implements ICommandHandler<UpdateFrozenPoultryInventoryCommand> {
  constructor(
    @InjectRepository(FrozenPoultryInventory)
    private readonly repository: Repository<FrozenPoultryInventory>,
  ) {}

  async execute(command: UpdateFrozenPoultryInventoryCommand): Promise<FrozenPoultryInventory> {
    const { id, updateFrozenPoultryInventoryDto } = command;

    const inventory = await this.repository.preload({
      InventoryID: id,
      ...updateFrozenPoultryInventoryDto,
    });

    if (!inventory) {
      throw new NotFoundException(`FrozenPoultryInventory with ID ${id} not found.`);
    }

    return this.repository.save(inventory);
  }
}