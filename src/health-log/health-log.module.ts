import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { HealthLogController } from './health-log.controller';

// استيراد مستلمات الأوامر
import { CreateHealthLogHandler } from './commands/handlers/create-health-log.handler';
import { UpdateHealthLogHandler } from './commands/handlers/update-health-log.handler';
import { RemoveHealthLogHandler } from './commands/handlers/remove-health-log.handler';

// استيراد مستلمات الاستعلامات
import { GetHealthLogHandler } from './queries/handlers/get-health-log.handler';
import { GetHealthLogsHandler } from './queries/handlers/get-health-logs.handler';
import { Poultry } from 'src/Core Models/Poultry';
import { HealthLog } from 'src/Core Models/HealthLog';

const CommandHandlers = [
  CreateHealthLogHandler,
  UpdateHealthLogHandler,
  RemoveHealthLogHandler,
];
const QueryHandlers = [GetHealthLogHandler, GetHealthLogsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([HealthLog, Poultry]), CqrsModule],
  controllers: [HealthLogController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class HealthLogModule {}
