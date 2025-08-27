// src/breed/commands/handlers/create-breed.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBreedCommand } from '../impl/create-breed.command';
import { Breed } from 'src/Core Models/Breed';

@CommandHandler(CreateBreedCommand)
export class CreateBreedHandler implements ICommandHandler<CreateBreedCommand> {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async execute(command: CreateBreedCommand): Promise<Breed> {
    const { createBreedDto } = command;
    const breed = this.breedRepository.create(createBreedDto as Partial<Breed>);
    return this.breedRepository.save(breed);
  }
}