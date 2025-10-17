import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetDebtsQuery } from '../impl/GetDebtsQuery';
import { Debt } from 'src/Core Models/Debt';

@QueryHandler(GetDebtsQuery)
export class GetDebtsHandler implements IQueryHandler<GetDebtsQuery> {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
  ) {}

  async execute(): Promise<Debt[]> {
    return this.debtRepository.find();
  }
}
