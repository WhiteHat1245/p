import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveEggProductionCommand } from '../Impi/RemoveEggProductionCommand';
import { EggProduction } from 'src/Core Models/EggProduction';

@CommandHandler(RemoveEggProductionCommand)
export class RemoveEggProductionHandler
  implements ICommandHandler<RemoveEggProductionCommand>
{
  constructor(
    @InjectRepository(EggProduction)
    private readonly eggProductionRepository: Repository<EggProduction>,
  ) {}

  async execute(command: RemoveEggProductionCommand): Promise<void> {
    const { id } = command;
    const result = await this.eggProductionRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(
        `Egg Production record with ID ${id} not found`,
      );
    }
  }
}
