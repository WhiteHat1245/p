import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEggInventoryCommand } from '../Impi/CreateEggInventoryCommand';
import { EggInventory } from 'src/Core Models/EggInventory';

@CommandHandler(CreateEggInventoryCommand)
export class CreateEggInventoryHandler
  implements ICommandHandler<CreateEggInventoryCommand>
{
  constructor(
    @InjectRepository(EggInventory)
    private readonly eggInventoryRepository: Repository<EggInventory>,
  ) {}

  async execute(command: CreateEggInventoryCommand): Promise<EggInventory> {
    const { createEggInventoryDto } = command;
    const inventory = this.eggInventoryRepository.create(createEggInventoryDto);
    return this.eggInventoryRepository.save(inventory);
  }
}
