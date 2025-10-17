import { CreateCustomerDto } from 'src/customer/dto/create-customer.dto.ts/create-customer.dto.ts';

export class CreateCustomerCommand {
  constructor(public readonly createCustomerDto: CreateCustomerDto) {}
}
