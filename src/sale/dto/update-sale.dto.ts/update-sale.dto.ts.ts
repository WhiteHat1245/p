import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleDto } from '../create-sale.dto.ts/create-sale.dto.ts';

export class UpdateSaleDto extends PartialType(CreateSaleDto) {}
