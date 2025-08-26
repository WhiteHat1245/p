import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPoultriesQuery } from '../impl/get-poultries.query.js';
import { Poultry } from '../../../Core Models/Poultry';

@QueryHandler(GetPoultriesQuery)
export class GetPoultriesHandler implements IQueryHandler<GetPoultriesQuery> {
  constructor(
    @InjectRepository(Poultry)
    private readonly poultryRepository: Repository<Poultry>,
  ) {}

  async execute(): Promise<Poultry[]> {
    return this.poultryRepository.find();
  }
}
