import { InjectRepository } from '@nestjs/typeorm';
import { Debt } from 'src/Core Models/Debt';
import { Repository } from 'typeorm';
import { GetTotalDebtQuery } from '../impl/get-total-debt.query';

export class GetTotalDebtHandler {
  constructor(
    @InjectRepository(Debt)
    private readonly debtRepository: Repository<Debt>,
  ) {}

  async execute(query: GetTotalDebtQuery): Promise<Number> {
    const { customerId } = query;
    const result = await this.debtRepository
      .createQueryBuilder('debt')
      .select('SUM(debt.amount)', 'total')
      .where('debt.customerId = :customerId', { customerId })
      .andWhere('debt.isPaid = :isPaid', { isPaid: false })
      .getRawOne();
    return result.total || 0;
  }
}
