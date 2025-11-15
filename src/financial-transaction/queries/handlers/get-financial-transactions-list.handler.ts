import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFinancialTransactionsListQuery } from '../impl/get-financial-transactions-list.query';

@QueryHandler(GetFinancialTransactionsListQuery)
export class GetFinancialTransactionsListHandler implements IQueryHandler<GetFinancialTransactionsListQuery> {
  constructor() {}

  async execute(query: GetFinancialTransactionsListQuery): Promise<any[]> {
    console.log('Executing GetFinancialTransactionsListQuery', query);
    return [
        { id: '1', amount: 100, description: 'Sample Transaction 1' },
        { id: '2', amount: 200, description: 'Sample Transaction 2' }
    ];
  }
}
