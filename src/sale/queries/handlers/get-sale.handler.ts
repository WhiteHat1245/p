// src/sale/queries/handlers/get-sale.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetSaleQuery } from '../impl/get-sale.query';
import { Sale } from 'src/Core Models/Sale ';

@QueryHandler(GetSaleQuery)
export class GetSaleHandler implements IQueryHandler<GetSaleQuery> {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
  ) {}

  async execute(query: GetSaleQuery): Promise<Sale> {
    const { saleId } = query;
    const sale = await this.saleRepository.findOne({
      where: { SaleID: saleId },
      relations: ['SaleDetails'],
    });
    if (!sale) {
      throw new NotFoundException(`Sale with ID ${saleId} not found`);
    }
    return sale;
  }
}
