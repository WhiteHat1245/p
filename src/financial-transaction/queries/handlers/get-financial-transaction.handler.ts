import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFinancialTransactionQuery } from '../impl/get-financial-transaction.query';

@QueryHandler(GetFinancialTransactionQuery)
export class GetFinancialTransactionHandler implements IQueryHandler<GetFinancialTransactionQuery> {
  constructor() {}

  async execute(query: GetFinancialTransactionQuery): Promise<any> {
    console.log('Executing GetFinancialTransactionQuery', query);
    return { id: query.id, amount: 100, description: 'Sample Transaction' };
  }
}
