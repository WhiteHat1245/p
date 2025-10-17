import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveEggInventoryCommand } from '../Impi/RemoveEggInventoryCommand';
import { EggInventory } from 'src/Core Models/EggInventory';

@CommandHandler(RemoveEggInventoryCommand)
export class RemoveEggInventoryHandler
  implements ICommandHandler<RemoveEggInventoryCommand>
{
  constructor(
    @InjectRepository(EggInventory)
    private readonly eggInventoryRepository: Repository<EggInventory>,
  ) {}

  async execute(command: RemoveEggInventoryCommand): Promise<void> {
    const { id } = command;
    const result = await this.eggInventoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Egg Inventory with ID ${id} not found`);
    }
  }
}
