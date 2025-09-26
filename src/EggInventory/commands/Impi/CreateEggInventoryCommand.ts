import { CreateEggInventoryDto } from '../../dto/CreateEggInventoryDto';
export class CreateEggInventoryCommand {
  constructor(public readonly createEggInventoryDto: CreateEggInventoryDto) {}
}
