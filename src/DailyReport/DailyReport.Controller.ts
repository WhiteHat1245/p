import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateDailyReportDto } from './dto/CreateDailyReportDto';
import { CreateDailyReportCommand } from './Commands/impl/CreateDailyReportCommand';
import { DailyReport } from 'src/Core Models/DailyReport';
import { GetDailyReportQuery } from './queries/impl/GetDailyReportQuery';
import { GetDailyReportsQuery } from './queries/impl/GetDailyReportsQuery';
import { UpdateDailyReportDto } from './dto/UpdateDailyReportDto';
import { UpdateDailyReportCommand } from './Commands/impl/UpdateDailyReportCommand';
import { RemoveDailyReportCommand } from './Commands/impl/RemoveDailyReportCommand';

@Controller('daily-report')
export class DailyReportController {
  constructor(private readonly commandBus: CommandBus, private readonly queryBus: QueryBus) {}

  @Post()
  create(@Body() dto: CreateDailyReportDto): Promise<DailyReport> {
    return this.commandBus.execute(new CreateDailyReportCommand(dto));
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<DailyReport> {
    return this.queryBus.execute(new GetDailyReportQuery(id));
  }

  @Get()
  findAll(): Promise<DailyReport[]> {
    return this.queryBus.execute(new GetDailyReportsQuery());
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateDailyReportDto,
  ): Promise<DailyReport> {
    return this.commandBus.execute(new UpdateDailyReportCommand(id, dto));
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.commandBus.execute(new RemoveDailyReportCommand(id));
  }
}
