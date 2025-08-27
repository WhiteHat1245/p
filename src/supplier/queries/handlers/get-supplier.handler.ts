// src/supplier/queries/handlers/get-supplier.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetSupplierQuery } from '../impl/get-supplier.query';
import { Supplier } from 'src/Core Models/Supplier';

@QueryHandler(GetSupplierQuery)
export class GetSupplierHandler implements IQueryHandler<GetSupplierQuery> {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async execute(query: GetSupplierQuery): Promise<Supplier> {
    const { supplierId } = query;
    const supplier = await this.supplierRepository.findOne({ where: { SupplierID: supplierId }, relations: ['Purchases'] });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${supplierId} not found`);
    }
    return supplier;
  }
}