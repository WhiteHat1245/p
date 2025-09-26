import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EggInventory } from 'src/Core Models/EggInventory';
import { GetEggInventoriesQuery } from '../Impi/GetEggInventoriesQuery';

@QueryHandler(GetEggInventoriesQuery)
export class GetEggInventoriesHandler implements IQueryHandler<GetEggInventoriesQuery> {
  constructor(
    @InjectRepository(EggInventory)
    private readonly eggInventoryRepository: Repository<EggInventory>,
  ) {}

  async execute(): Promise<EggInventory[]> {
    return this.eggInventoryRepository.find();
  }
}
