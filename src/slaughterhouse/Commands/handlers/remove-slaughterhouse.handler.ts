// src/slaughterhouse/commands/handlers/remove-slaughterhouse.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveSlaughterhouseCommand } from '../impl/remove-slaughterhouse.command';
import { Slaughterhouse } from 'src/Core Models/slaughterhouse';

@CommandHandler(RemoveSlaughterhouseCommand)
export class RemoveSlaughterhouseHandler implements ICommandHandler<RemoveSlaughterhouseCommand> {
  constructor(
    @InjectRepository(Slaughterhouse)
    private readonly slaughterhouseRepository: Repository<Slaughterhouse>,
  ) {}

  async execute(command: RemoveSlaughterhouseCommand): Promise<void> {
    const { id } = command;
    const result = await this.slaughterhouseRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Slaughterhouse with ID ${id} not found`);
    }
  }
}