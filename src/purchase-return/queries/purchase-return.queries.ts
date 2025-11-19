import { IQueryHandler, IQuery, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { PurchaseReturn } from 'src/Core Models/PurchaseReturn';

// --- Queries ---
export class GetPurchaseReturnQuery implements IQuery {
  constructor(public readonly id: number) {}
}

export class GetPurchaseReturnsListQuery implements IQuery {
  constructor() {}
}

// --- Handlers ---
@QueryHandler(GetPurchaseReturnQuery)
export class GetPurchaseReturnHandler implements IQueryHandler<GetPurchaseReturnQuery> {
  constructor(@InjectRepository(PurchaseReturn) private readonly repository: Repository<PurchaseReturn>) {}
  async execute(query: GetPurchaseReturnQuery): Promise<PurchaseReturn> {
    const entry = await this.repository.findOne({ 
      where: { ReturnID: query.id },
      relations: ['Supplier', 'Purchase', 'PurchaseReturnDetails', 'PurchaseReturnDetails.PurchaseDetail'] 
    });
    if (!entry) {
      throw new NotFoundException(`Purchase Return with ID ${query.id} not found.`);
    }
    return entry;
  }
}

@QueryHandler(GetPurchaseReturnsListQuery)
export class GetPurchaseReturnsListHandler implements IQueryHandler<GetPurchaseReturnsListQuery> {
  constructor(@InjectRepository(PurchaseReturn) private readonly repository: Repository<PurchaseReturn>) {}
  async execute(): Promise<PurchaseReturn[]> {
    return this.repository.find({
      relations: ['Supplier', 'Purchase'],
      order: { ReturnDate: 'DESC' },
    });
  }
}