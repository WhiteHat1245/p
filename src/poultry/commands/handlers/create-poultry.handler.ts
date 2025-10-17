// src/poultry/commands/handlers/create-poultry.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePoultryCommand } from '../impl/create-poultry.command';
import { Poultry } from '../../../Core Models/Poultry';

@CommandHandler(CreatePoultryCommand)
export class CreatePoultryHandler
  implements ICommandHandler<CreatePoultryCommand>
{
  constructor(
    @InjectRepository(Poultry)
    private readonly poultryRepository: Repository<Poultry>,
  ) {}

  async execute(command: CreatePoultryCommand): Promise<Poultry> {
    const { createPoultryDto } = command;
    const poultry = this.poultryRepository.create(createPoultryDto);
    return (await this.poultryRepository.save(poultry)) as unknown as Poultry;
  }
}
