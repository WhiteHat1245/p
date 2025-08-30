import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetExpensesQuery } from '../Impi/GetExpensesQuery';
import { Expense } from 'src/Core Models/Expense';

@QueryHandler(GetExpensesQuery)
export class GetExpensesHandler implements IQueryHandler<GetExpensesQuery> {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async execute(): Promise<Expense[]> {
    return this.expenseRepository.find();
  }
}
