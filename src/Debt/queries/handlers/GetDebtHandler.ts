import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetDebtQuery } from '../impl/GetDebtQuery';
import { Debt } from 'src/Core Models/Debt';

@QueryHandler(GetDebtQuery)
export class GetDebtHandler implements IQueryHandler<GetDebtQuery> {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
  ) {}

  async execute(query: GetDebtQuery): Promise<Debt> {
    const { debtId } = query;
    const debt = await this.debtRepository.findOne({ where: { DebtID: debtId } });
    if (!debt) {
      throw new NotFoundException(`Debt with ID ${debtId} not found`);
    }
    return debt;
  }
}
