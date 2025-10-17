// src/farm/commands/handlers/remove-farm.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveFarmCommand } from '../impl/remove-farm.command';
import { Farm } from 'src/Core Models/Farm';

@CommandHandler(RemoveFarmCommand)
export class RemoveFarmHandler implements ICommandHandler<RemoveFarmCommand> {
  constructor(
    @InjectRepository(Farm)
    private readonly farmRepository: Repository<Farm>,
  ) {}

  async execute(command: RemoveFarmCommand): Promise<void> {
    const { id } = command;
    const result = await this.farmRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Farm with ID ${id} not found`);
    }
  }
}
