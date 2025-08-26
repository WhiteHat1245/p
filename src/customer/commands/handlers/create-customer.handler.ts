// src/customer/commands/handlers/create-customer.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerCommand } from '../impl/create-customer.command';
import { Customer } from 'src/Core Models/Customer';

@CommandHandler(CreateCustomerCommand)
export class CreateCustomerHandler implements ICommandHandler<CreateCustomerCommand> {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async execute(command: CreateCustomerCommand): Promise<Customer> {
    const { createCustomerDto } = command;
    const customer = this.customerRepository.create(createCustomerDto as Partial<Customer>);
    return await this.customerRepository.save(customer);
  }
}