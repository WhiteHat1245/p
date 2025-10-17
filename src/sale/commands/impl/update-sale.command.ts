import { UpdateSaleDto } from 'src/sale/dto/update-sale.dto.ts/update-sale.dto.ts';

export class UpdateSaleCommand {
  constructor(
    public readonly id: number,
    public readonly updateSaleDto: UpdateSaleDto,
  ) {}
}
