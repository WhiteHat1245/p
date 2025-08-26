// src/customer/queries/handlers/get-customer.handler.ts
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetCustomerQuery } from '../impl/get-customer.query';
import { Customer } from 'src/Core Models/Customer';

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler implements IQueryHandler<GetCustomerQuery> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(query: GetCustomerQuery): Promise<Customer> {
    const { customerId } = query;
    const customer = await this.customerRepository.findOne({ where: { CustomerID: customerId }, relations: ['Sales'] });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${customerId} not found`);
    }
    return customer;
  }
}