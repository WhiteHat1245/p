import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEggProductionCommand } from '../Impi/CreateEggProductionCommand';
import { EggProduction } from 'src/Core Models/EggProduction';

@CommandHandler(CreateEggProductionCommand)
export class CreateEggProductionHandler implements ICommandHandler<CreateEggProductionCommand> {
  constructor(
    @InjectRepository(EggProduction)
    private readonly eggProductionRepository: Repository<EggProduction>,
  ) {}

  async execute(command: CreateEggProductionCommand): Promise<EggProduction> {
    const { createEggProductionDto } = command;
    const production = this.eggProductionRepository.create(createEggProductionDto);
    return this.eggProductionRepository.save(production);
  }
}
