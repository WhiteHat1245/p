import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCoopsQuery } from '../impl/get-coop.query';
import { Coop } from 'src/Core Models/Coop';

@QueryHandler(GetCoopsQuery)
export class GetCoopsHandler implements IQueryHandler<GetCoopsQuery> {
  constructor(
    @InjectRepository(Coop)
    private readonly coopRepository: Repository<Coop>,
  ) {}

  async execute(): Promise<Coop[]> {
    return this.coopRepository.find();
  }
}