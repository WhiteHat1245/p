import { UpdateEggInventoryDto } from '../../dto/UpdateEggInventoryDto';
export class UpdateEggInventoryCommand {
  constructor(
    public readonly id: number,
    public readonly updateEggInventoryDto: UpdateEggInventoryDto,
  ) {}
}
