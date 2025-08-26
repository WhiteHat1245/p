import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSalesQuery } from '../impl/get-sale.query';
import { Sale } from 'src/Core Models/Sale ';


@QueryHandler(GetSalesQuery)
export class GetSalesHandler implements IQueryHandler<GetSalesQuery> {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async execute(): Promise<Sale[]> {
    return this.saleRepository.find({ relations: ['SaleDetails'] });
  }
}