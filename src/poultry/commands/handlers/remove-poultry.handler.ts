// src/poultry/commands/handlers/remove-poultry.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemovePoultryCommand } from '../impl/remove-poultry.command';
import { Poultry } from '../../../Core Models/Poultry';

@CommandHandler(RemovePoultryCommand)
export class RemovePoultryHandler
  implements ICommandHandler<RemovePoultryCommand>
{
  constructor(
    @InjectRepository(Poultry)
    private readonly poultryRepository: Repository<Poultry>,
  ) {}

  async execute(command: RemovePoultryCommand): Promise<void> {
    const { id } = command;
    const result = await this.poultryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Poultry with ID ${id} not found`);
    }
  }
}
