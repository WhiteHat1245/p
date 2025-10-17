import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoopCommand } from '../impl/create-coop.command';
import { Coop } from 'src/Core Models/Coop';

@CommandHandler(CreateCoopCommand)
export class CreateCoopHandler implements ICommandHandler<CreateCoopCommand> {
  constructor(
    @InjectRepository(Coop)
    private readonly coopRepository: Repository<Coop>,
  ) {}

  async execute(command: CreateCoopCommand): Promise<Coop> {
    const { createCoopDto } = command;
    const coop = this.coopRepository.create(createCoopDto as Partial<Coop>);
    return this.coopRepository.save(coop);
  }
}
