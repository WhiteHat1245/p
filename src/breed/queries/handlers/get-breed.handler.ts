// src/breed/queries/handlers/get-breed.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetBreedQuery } from '../impl/get-breed.query';
import { Breed } from 'src/Core Models/Breed';

@QueryHandler(GetBreedQuery)
export class GetBreedHandler implements IQueryHandler<GetBreedQuery> {
  constructor(
    @InjectRepository(Breed)
    private readonly breedRepository: Repository<Breed>,
  ) {}

  async execute(query: GetBreedQuery): Promise<Breed> {
    const { breedId } = query;
    const breed = await this.breedRepository.findOne({
      where: { BreedID: breedId },
      relations: ['Poultry'],
    });
    if (!breed) {
      throw new NotFoundException(`Breed with ID ${breedId} not found`);
    }
    return breed;
  }
}
