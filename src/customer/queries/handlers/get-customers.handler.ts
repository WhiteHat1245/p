// src/customer/queries/handlers/get-customers.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetCustomersQuery } from '../impl/get-customers.query';
import { Customer } from 'src/Core Models/Customer';

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['Sales'] });
  }
}