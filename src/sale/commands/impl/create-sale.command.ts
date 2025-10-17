import { CreateSaleDto } from 'src/sale/dto/create-sale.dto.ts/create-sale.dto.ts';

export class CreateSaleCommand {
  constructor(public readonly createSaleDto: CreateSaleDto) {}
}
