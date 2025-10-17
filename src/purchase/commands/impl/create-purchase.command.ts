import { CreatePurchaseDto } from 'src/purchase/dto/create-purchase.dto.ts/create-purchase.dto.ts';

export class CreatePurchaseCommand {
  constructor(public readonly createPurchaseDto: CreatePurchaseDto) {}
}
