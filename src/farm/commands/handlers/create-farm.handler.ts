// src/farm/commands/handlers/create-farm.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFarmCommand } from '../impl/create-farm.command';
import { Farm } from 'src/Core Models/Farm';

@CommandHandler(CreateFarmCommand)
export class CreateFarmHandler implements ICommandHandler<CreateFarmCommand> {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async execute(command: CreateFarmCommand): Promise<Farm> {
    const { createFarmDto } = command;
    const farm = this.farmRepository.create(createFarmDto as Partial<Farm>);
    return this.farmRepository.save(farm);
  }
}