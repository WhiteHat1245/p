// src/breed/commands/handlers/update-breed.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UpdateBreedCommand } from '../impl/update-breed.command';
import { Breed } from 'src/Core Models/Breed';

@CommandHandler(UpdateBreedCommand)
export class UpdateBreedHandler implements ICommandHandler<UpdateBreedCommand> {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async execute(command: UpdateBreedCommand): Promise<Breed> {
    const { id, updateBreedDto } = command;
    const breed = await this.breedRepository.preload({ BreedID: id, ...updateBreedDto });
    if (!breed) {
      throw new NotFoundException(`Breed with ID ${id} not found`);
    }
    return this.breedRepository.save(breed);
  }
}