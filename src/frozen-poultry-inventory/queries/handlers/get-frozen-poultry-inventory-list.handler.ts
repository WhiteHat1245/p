import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetFrozenPoultryInventoryListQuery } from '../impl/get-frozen-poultry-inventory-list.query';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';

@QueryHandler(GetFrozenPoultryInventoryListQuery)
export class GetFrozenPoultryInventoryListHandler
  implements IQueryHandler<GetFrozenPoultryInventoryListQuery>
{
  constructor(
    @InjectRepository(FrozenPoultryInventory)
    private readonly repository: Repository<FrozenPoultryInventory>,
  ) {}

  async execute(query: GetFrozenPoultryInventoryListQuery) {
    return this.repository.find();
  }
}
