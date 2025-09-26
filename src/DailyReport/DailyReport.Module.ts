import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { CreateDailyReportHandler } from './Commands/handlers/CreateDailyReportHandler';
import { GetDailyReportsHandler } from './queries/handlers/GetDailyReportsHandler';
import { GetDailyReportHandler } from './queries/handlers/GetDailyReportHandler';
import { UpdateDailyReportHandler } from './Commands/handlers/UpdateDailyReportHandler';
import { RemoveDailyReportHandler } from './Commands/handlers/RemoveDailyReportHandler';
import { DailyReport } from 'src/Core Models/DailyReport';
import { DailyReportController } from './DailyReport.Controller';


const CommandHandlers = [CreateDailyReportHandler, UpdateDailyReportHandler, RemoveDailyReportHandler];
const QueryHandlers = [GetDailyReportHandler, GetDailyReportsHandler];

@Module({
  imports: [TypeOrmModule.forFeature([DailyReport]), CqrsModule],
  controllers: [DailyReportController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class DailyReportModule {}
