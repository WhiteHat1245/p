
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreatePerformanceMetricDto } from './dto/create-performance-metric.dto';
import { UpdatePerformanceMetricDto } from './dto/update-performance-metric.dto';
import { CreatePerformanceMetricCommand, UpdatePerformanceMetricCommand, DeletePerformanceMetricCommand } from './commands/performance-metric-commands';
import { GetAllPerformanceMetricsQuery, GetPerformanceMetricByIdQuery } from './queries/performance-metric-queries';

@Controller('performance-metric')
export class PerformanceMetricController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createPerformanceMetricDto: CreatePerformanceMetricDto) {
    return this.commandBus.execute(new CreatePerformanceMetricCommand(createPerformanceMetricDto));
  }

  @Get()
  findAll() {
    return this.queryBus.execute(new GetAllPerformanceMetricsQuery());
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.queryBus.execute(new GetPerformanceMetricByIdQuery(+id));
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePerformanceMetricDto: UpdatePerformanceMetricDto) {
    return this.commandBus.execute(new UpdatePerformanceMetricCommand(+id, updatePerformanceMetricDto));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commandBus.execute(new DeletePerformanceMetricCommand(+id));
  }
}
