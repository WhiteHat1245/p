import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { SalesReturn } from 'src/Core Models/SalesReturn';
import { Repository } from 'typeorm';

@QueryHandler(GetSalesReturnsHandler)
export class GetSalesReturnsHandler
  implements IQueryHandler<GetSalesReturnsHandler>
{
  constructor(
    @InjectRepository(SalesReturn)
    private readonly salesReturnRepository: Repository<SalesReturn>,
  ) {}

  async execute(query: GetSalesReturnsHandler): Promise<SalesReturn[]> {
    return this.salesReturnRepository.find({
      relations: ['SalesReturnDetails', 'Customer', 'Sale'],
    });
  }
}
