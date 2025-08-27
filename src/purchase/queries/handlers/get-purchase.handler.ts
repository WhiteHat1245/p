// src/purchase/queries/handlers/get-purchase.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetPurchaseQuery } from '../impl/get-purchase.query';
import { Purchase } from 'src/Core Models/Purchase ';

@QueryHandler(GetPurchaseQuery)
export class GetPurchaseHandler implements IQueryHandler<GetPurchaseQuery> {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
  ) {}

  async execute(query: GetPurchaseQuery): Promise<Purchase> {
    const { purchaseId } = query;
    const purchase = await this.purchaseRepository.findOne({ where: { PurchaseID: purchaseId }, relations: ['Supplier', 'PurchaseDetails'] });
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${purchaseId} not found`);
    }
    return purchase;
  }
}