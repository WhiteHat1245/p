import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Mortality } from 'src/Core Models/Mortality';
import { Repository } from 'typeorm';

// Get All Query and Handler
export class GetAllMortalitesQuery {}

@QueryHandler(GetAllMortalitesQuery)
export class GetAllMortalitesQueryHandler implements IQueryHandler<GetAllMortalitesQuery> {
  constructor(
    @InjectRepository(Mortality)
    private readonly mortalityRepository: Repository<Mortality>,
  ) {}

  async execute(query: GetAllMortalitesQuery): Promise<Mortality[]> {
    return this.mortalityRepository.find();
  }
}

// Get By ID Query and Handler
export class GetMortalityByIdQuery {
  constructor(public readonly id: number) {}
}

@QueryHandler(GetMortalityByIdQuery)
export class GetMortalityByIdQueryHandler implements IQueryHandler<GetMortalityByIdQuery> {
  constructor(
    @InjectRepository(Mortality)
    private readonly mortalityRepository: Repository<Mortality>,
  ) {}

  async execute(query: GetMortalityByIdQuery): Promise<Mortality | null> {
    return this.mortalityRepository.findOneBy({ MortalityID: query.id });
  }
}