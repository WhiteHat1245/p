import { CreateSupplierDto } from 'src/supplier/dto/create-supplier.dto.ts/create-supplier.dto.ts';

export class CreateSupplierCommand {
  constructor(public readonly createSupplierDto: CreateSupplierDto) {}
}
