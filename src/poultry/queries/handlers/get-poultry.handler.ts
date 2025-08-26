import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPoultryQuery } from '../impl/get-poultry.query.js';
import { Poultry } from '../../../Core Models/Poultry';

@QueryHandler(GetPoultryQuery)
export class GetPoultryHandler implements IQueryHandler<GetPoultryQuery> {
  constructor(
    @InjectRepository(Poultry)
    private readonly poultryRepository: Repository<Poultry>,
  ) {}

  async execute(query: GetPoultryQuery): Promise<Poultry | null> {
    const { id } = query;
    return this.poultryRepository.findOne({ where: { PoultryID: id } });
  }
}
