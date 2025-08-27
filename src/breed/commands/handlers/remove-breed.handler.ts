// src/breed/commands/handlers/remove-breed.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { RemoveBreedCommand } from '../impl/remove-breed.command';
import { Breed } from 'src/Core Models/Breed';

@CommandHandler(RemoveBreedCommand)
export class RemoveBreedHandler implements ICommandHandler<RemoveBreedCommand> {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async execute(command: RemoveBreedCommand): Promise<void> {
    const { id } = command;
    const result = await this.breedRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Breed with ID ${id} not found`);
    }
  }
}