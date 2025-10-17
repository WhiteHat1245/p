import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetExpenseQuery } from '../Impi/GetExpenseQuery';
import { Expense } from 'src/Core Models/Expense';

@QueryHandler(GetExpenseQuery)
export class GetExpenseHandler implements IQueryHandler<GetExpenseQuery> {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) {}

  async execute(query: GetExpenseQuery): Promise<Expense> {
    const { expenseId } = query;
    const expense = await this.expenseRepository.findOne({
      where: { ExpenseID: expenseId },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${expenseId} not found`);
    }

    return expense;
  }
}
