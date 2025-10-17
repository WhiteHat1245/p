// src/purchase/queries/handlers/get-purchases.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetPurchasesQuery } from '../impl/get-purchases.query';
import { Purchase } from 'src/Core Models/Purchase ';

@QueryHandler(GetPurchasesQuery)
export class GetPurchasesHandler implements IQueryHandler<GetPurchasesQuery> {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async execute(): Promise<Purchase[]> {
    return this.purchaseRepository.find({
      relations: ['Supplier', 'PurchaseDetails'],
    });
  }
}
