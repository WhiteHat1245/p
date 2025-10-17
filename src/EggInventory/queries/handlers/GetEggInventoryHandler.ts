import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { GetEggInventoryQuery } from '../Impi/GetEggInventoryQuery';
import { EggInventory } from 'src/Core Models/EggInventory';

@QueryHandler(GetEggInventoryQuery)
export class GetEggInventoryHandler
  implements IQueryHandler<GetEggInventoryQuery>
{
  constructor(
    @InjectRepository(EggInventory)
    private readonly eggInventoryRepository: Repository<EggInventory>,
  ) {}

  async execute(query: GetEggInventoryQuery): Promise<EggInventory> {
    const { inventoryId } = query;
    const inventory = await this.eggInventoryRepository.findOne({
      where: { InventoryID: inventoryId },
    });
    if (!inventory) {
      throw new NotFoundException(
        `Egg Inventory with ID ${inventoryId} not found`,
      );
    }
    return inventory;
  }
}
