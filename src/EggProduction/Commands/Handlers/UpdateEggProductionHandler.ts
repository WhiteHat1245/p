import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateEggProductionCommand } from '../Impi/UpdateEggProductionCommand';
import { EggProduction } from 'src/Core Models/EggProduction';

@CommandHandler(UpdateEggProductionCommand)
export class UpdateEggProductionHandler implements ICommandHandler<UpdateEggProductionCommand> {
  constructor(
    @InjectRepository(EggProduction)
    private readonly eggProductionRepository: Repository<EggProduction>,
  ) {}

  async execute(command: UpdateEggProductionCommand): Promise<EggProduction> {
    const { id, updateEggProductionDto } = command;
    const production = await this.eggProductionRepository.preload({
      EggProductionID: id,
      ...updateEggProductionDto,
    });

    if (!production) {
      throw new NotFoundException(`Egg Production record with ID ${id} not found`);
    }

    return this.eggProductionRepository.save(production);
  }
}
