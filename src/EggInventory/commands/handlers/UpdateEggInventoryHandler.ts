import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateEggInventoryCommand } from '../Impi/UpdateEggInventoryCommand';
import { EggInventory } from 'src/Core Models/EggInventory';

@CommandHandler(UpdateEggInventoryCommand)
export class UpdateEggInventoryHandler implements ICommandHandler<UpdateEggInventoryCommand> {
  constructor(
    @InjectRepository(EggInventory)
    private readonly eggInventoryRepository: Repository<EggInventory>,
  ) {}

  async execute(command: UpdateEggInventoryCommand): Promise<EggInventory> {
    const { id, updateEggInventoryDto } = command;
    const inventory = await this.eggInventoryRepository.preload({ InventoryID: id, ...updateEggInventoryDto });
    if (!inventory) {
      throw new NotFoundException(`Egg Inventory with ID ${id} not found`);
    }
    return this.eggInventoryRepository.save(inventory);
  }
}
