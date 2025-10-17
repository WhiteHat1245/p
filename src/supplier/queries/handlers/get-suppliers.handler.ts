// src/supplier/queries/handlers/get-suppliers.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetSuppliersQuery } from '../impl/get-suppliers.query';
import { Supplier } from 'src/Core Models/Supplier';

@QueryHandler(GetSuppliersQuery)
export class GetSuppliersHandler implements IQueryHandler<GetSuppliersQuery> {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async execute(): Promise<Supplier[]> {
    return this.supplierRepository.find({ relations: ['Purchases'] });
  }
}
