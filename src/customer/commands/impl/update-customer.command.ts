import { UpdateCustomerDto } from "src/customer/dto/update-customer.dto.ts/update-customer.dto.ts";

export class UpdateCustomerCommand {
  constructor(public readonly id: number, public readonly updateCustomerDto: UpdateCustomerDto) {}
}
