import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FrozenPoultryInventoryController } from './frozen-poultry-inventory.controller';
import { CreateFrozenPoultryInventoryHandler } from './commands/handlers/create-frozen-poultry-inventory.handler';
import { UpdateFrozenPoultryInventoryHandler } from './commands/handlers/update-frozen-poultry-inventory.handler';
import { RemoveFrozenPoultryInventoryHandler } from './commands/handlers/remove-frozen-poultry-inventory.handler';
import { GetFrozenPoultryInventoryHandler } from './queries/handlers/get-frozen-poultry-inventory.handler';
import { GetFrozenPoultryInventoryListHandler } from './queries/handlers/get-frozen-poultry-inventory-list.handler';
import { FrozenPoultryInventory } from 'src/Core Models/FrozenPoultryInventory';

export const CommandHandlers = [
  CreateFrozenPoultryInventoryHandler,
  UpdateFrozenPoultryInventoryHandler,
  RemoveFrozenPoultryInventoryHandler,
];
export const QueryHandlers = [
  GetFrozenPoultryInventoryHandler,
  GetFrozenPoultryInventoryListHandler,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([FrozenPoultryInventory]),
    CqrsModule,
  ],
  controllers: [FrozenPoultryInventoryController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class FrozenPoultryInventoryModule {}
