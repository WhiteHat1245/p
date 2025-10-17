import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateEggInventoryHandler } from './commands/handlers/CreateEggInventoryHandler';
import { GetEggInventoryHandler } from './queries/handlers/GetEggInventoryHandler';
import { GetEggInventoriesHandler } from './queries/handlers/GetEggInventoriesHandler';
import { UpdateEggInventoryHandler } from './commands/handlers/UpdateEggInventoryHandler';
import { EggInventoryController } from './EggInventory.Controller';
import { EggInventory } from 'src/Core Models/EggInventory';
import { RemoveEggInventoryHandler } from './commands/handlers/RemoveEggInventoryHandler';

const CommandHandlers = [
  CreateEggInventoryHandler,
  UpdateEggInventoryHandler,
  RemoveEggInventoryHandler,
];
const QueryHandlers = [GetEggInventoryHandler, GetEggInventoriesHandler];

@Module({
  imports: [TypeOrmModule.forFeature([EggInventory]), CqrsModule],
  controllers: [EggInventoryController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class EggInventoryModule {}
