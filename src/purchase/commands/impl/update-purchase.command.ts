import { UpdatePurchaseDto } from 'src/purchase/dto/update-purchase.dto.ts/update-purchase.dto.ts';

export class UpdatePurchaseCommand {
  constructor(
    public readonly id: number,
    public readonly updatePurchaseDto: UpdatePurchaseDto,
  ) {}
}
