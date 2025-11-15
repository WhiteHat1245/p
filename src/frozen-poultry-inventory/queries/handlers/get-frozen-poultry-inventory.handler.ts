import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFrozenPoultryInventoryQuery } from '../impl/get-frozen-poultry-inventory.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';

@QueryHandler(GetFrozenPoultryInventoryQuery)
export class GetFrozenPoultryInventoryHandler
  implements IQueryHandler<GetFrozenPoultryInventoryQuery>
{
  constructor(
    @InjectRepository(FrozenPoultryInventory)
    private readonly repository: Repository<FrozenPoultryInventory>,
  ) {}

  async execute(query: GetFrozenPoultryInventoryQuery) {
    const { id } = query;
 return this.repository.findOne({ where: { InventoryID: parseInt(id, 10) } });
  }
}
