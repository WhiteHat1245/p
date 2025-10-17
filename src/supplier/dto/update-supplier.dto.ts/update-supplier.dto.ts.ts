import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierDto } from '../create-supplier.dto.ts/create-supplier.dto.ts';

export class UpdateSupplierDto extends PartialType(CreateSupplierDto) {}
