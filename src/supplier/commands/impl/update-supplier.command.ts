import { UpdateSupplierDto } from "src/supplier/dto/update-supplier.dto.ts/update-supplier.dto.ts";

export class UpdateSupplierCommand {
  constructor(public readonly id: number, public readonly updateSupplierDto: UpdateSupplierDto) {}
}