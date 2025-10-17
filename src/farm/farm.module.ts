import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { FarmController } from './farm.controller';

// استيراد مستلمات الأوامر
import { CreateFarmHandler } from './commands/handlers/create-farm.handler';
import { UpdateFarmHandler } from './commands/handlers/update-farm.handler';
import { RemoveFarmHandler } from './commands/handlers/remove-farm.handler';

// استيراد مستلمات الاستعلامات
import { GetFarmHandler } from './queries/handlers/get-farm.handler';
import { GetFarmsHandler } from './queries/handlers/get-farms.handler';
import { Farm } from 'src/Core Models/Farm';

const CommandHandlers = [
  CreateFarmHandler,
  UpdateFarmHandler,
  RemoveFarmHandler,
];
const QueryHandlers = [GetFarmHandler, GetFarmsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([Farm]), CqrsModule],
  controllers: [FarmController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class FarmModule {}
